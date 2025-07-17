# AI Orchestrator Design: The Navigator AI Brain

## 1. Core Philosophy: An Autonomous Team of Specialists

The Navigator AI Brain is not a single, monolithic model. It is designed as an **autonomous team of AI agents**, managed by a intelligent supervisor. This mirrors a real-world operations team: a manager (the Orchestrator) who understands the high-level goal, and specialists (the Agents) who are experts in their specific domains.

*   **Framework:** We will use **LangChain** to build the individual agents and their tools. We will use **LangGraph** to construct the Master Orchestrator, enabling complex, cyclical reasoning and state management.
*   **State Management:** The entire process is stateful. The `state` object, managed by LangGraph, will contain the user's query, journey constraints (time, budget), chat history, and the results from each agent's work.

## 2. The Master Orchestrator (The "Supervisor" - Built with LangGraph)

The Orchestrator's job is not to know the price of a train ticket. Its job is to **decide who to ask, what to ask them, and what to do with the answer.**

**Workflow:**

1.  **Receive Goal:** The Orchestrator receives the initial goal from the FastAPI backend (e.g., "User wants to go from Satna to IIIT Bhubaneswar tomorrow, budget is ₹1500").
2.  **Decompose Problem:** It analyzes the goal and breaks it down into logical steps. "First, I need to figure out the long-haul travel. Then, the first mile. Then, the last mile."
3.  **Route to Agent:** Based on the current step, the Orchestrator decides which Specialist Agent to call next. It will route the current `state` to that agent.
4.  **Evaluate & Iterate:** When an agent returns a result, the Orchestrator evaluates it.
    *   *Was it successful?* "The `RailAgent` found a train." -> **Next Step:** "Okay, now I need to route to the `LocalTransitAgent` to plan the first mile to the station."
    *   *Did it fail?* "The `RailAgent` found no trains." -> **Next Step:** "Okay, the initial plan is invalid. I will now route to the `BusAgent` as a fallback."
    *   *Is it ambiguous?* "The `LocalTransitAgent` found a taxi, but the travel time is close to the train's departure." -> **Next Step:** "This is risky. I will route to a `RiskAnalysisTool` to calculate the probability of success. If too low, I will ask the `RailAgent` to find a later train."
5.  **Synthesize Final Plan:** Once all legs of the journey are successfully planned and validated, the Orchestrator synthesizes the results into a single, coherent journey plan to be returned to the user.

**Example LangGraph Node Structure:**

*   **Nodes:** Each agent (`RailAgent`, `BusAgent`, `LocalTransitAgent`) is a node. We will also have tool nodes like `RiskAnalysisTool` and `FinalPlanSynthesizer`.
*   **Edges:** The "routing" logic defines the conditional edges. The Orchestrator decides which node to move to next based on the output of the current node. This allows for the complex, adaptive reasoning we need.

## 3. The Specialist Agents (The "Experts" - Built with LangChain)

Each agent is a LangChain object equipped with specific **Tools** and **Memory**.

*   **`UserIntentAgent`**
    *   **Job:** The first agent to be called. It parses the user's natural language query (`"I need to reach Nashik from Mumbai CSMT in 6 hours"`) and structures it into a machine-readable format for the `state` object (`{origin: "CSMT", destination: "Nashik", time_constraint: "6 hours"}`).
    *   **Tools:** Entity Extraction Models from Azure AI Foundry.

*   **`RailAgent`**
    *   **Job:** Expert on all things trains.
    *   **Tools:**
        *   `TrainSearchTool`: Connects to our partner rail API to find trains between two stations.
        *   `PNRStatusTool`: Checks PNR status.
        *   `SeatAvailabilityTool`: Checks seat availability.
        *   `TrainBookingTool`: Executes a booking (Phase 2).

*   **`LocalTransitAgent`**
    *   **Job:** Expert on first-mile and last-mile travel within a city.
    *   **Tools:**
        *   `GoogleMaps_RoutePlannerTool`: Gets route options and real-time traffic data.
        *   `Uber_FareEstimatorTool`: Gets ETA for pickup and fare estimates.
        *   `MIndicator_LocalTrainTool`: (For Mumbai) Gets local train schedules.

*   **`FairPriceAgent`** (Phase 2)
    *   **Job:** Expert on local market prices.
    *   **Tools:**
        *   `PriceLookupTool`: Queries our PostgreSQL database for the fair price range of an item in a specific geolocation.
        *   `PriceReportTool`: Allows users to submit new price data.

*   **`RiskAnalysisAgent` (Internal Tool)**
    *   **Job:** A non-LLM, pure logic agent. It takes inputs like "buffer time," "traffic variability," and "historical train punctuality" to calculate a "Success Probability Score" for a given plan.
    *   **Tools:** Statistical models, historical data from our Data Lake.

*   **`BookingAgent`** (Phase 2)
    *   **Job:** A transactional agent responsible for executing bookings.
    *   **Tools:** `Uber_BookRideTool`, `Rail_BookTicketTool`. It will interact with the `Navigator Pay` service to handle payments.

## 4. The Flow in Action: The "CSMT to LTT" Crisis

1.  **User Query:** "Help! CSMT to LTT in 45 mins!"
2.  **`UserIntentAgent`** structures the query.
3.  **Orchestrator** receives the structured goal and immediately calls the **`LocalTransitAgent`**.
4.  **`LocalTransitAgent`** simultaneously calls two tools:
    *   `GoogleMaps_RoutePlannerTool` for a taxi route. Result: 35 mins travel time.
    *   `MIndicator_LocalTrainTool`. Result: 25 mins travel + 10 mins auto from Kurla. Total ~35 mins.
5.  **`LocalTransitAgent`** returns both options to the **Orchestrator**.
6.  **Orchestrator** sees both options are cutting it close. It sends both plans to the **`RiskAnalysisAgent`**.
7.  **`RiskAnalysisAgent`** analyzes:
    *   *Taxi Plan:* Traffic is highly variable during this hour. Success Probability: 60%.
    *   *Train Plan:* Local train is crowded, risk of missing it. High reliability once on board. Success Probability: 75%.
8.  **Orchestrator** receives the risk scores. It makes the final decision: The train plan has a higher probability of success.
9.  **Orchestrator** synthesizes the final, actionable instruction and returns it to the user: **"Take the local train. It's your most reliable option. Head to Platform 4 for the next fast train to Kurla. I will guide you from there."**