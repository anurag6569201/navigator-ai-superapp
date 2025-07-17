# System Architecture: Navigator AI

## 1. Architectural Philosophy

Our system is designed around a **hybrid, microservices-based architecture hosted on the Azure cloud**. Our user-facing product will be a dynamic and responsive website, built to ensure full functionality and accessibility on both desktop and mobile browsers.

This approach leverages the strengths of different frameworks for their specific purposes:
*   **Django:** For robust, secure, and data-intensive business logic (Users, Payments, Bookings).
*   **FastAPI:** For high-performance, asynchronous AI model serving and real-time data handling.
*   **LangChain/LangGraph:** As the core framework for building our sophisticated, stateful AI agents.

## 2. High-Level System Diagram

This diagram illustrates the logical flow of information within the Navigator AI ecosystem. **Crucially, it shows how the Specialist AI Agents are the bridge to the External World, consuming data from third-party APIs.**

[![High-Level Architecture](https://github.com/anurag6569201/navigator-ai-superapp/raw/77234604e18d6f2db0fb3ea1dd4c418934b5a4a8/resources/High-Level-System.png)](https://github.com/anurag6569201/navigator-ai-superapp/blob/77234604e18d6f2db0fb3ea1dd4c418934b5a4a8/resources/High-Level-System.png)


## 3. Component Breakdown (Technical Implementation)

### 🔹 Dynamic Website (Client)
- **Technology:** React.js / Vue.js  

---

### 🔹 API Gateway
- **Technology:** Azure API Management  

---

### 🔹 Backend Services

#### ✅ Django Services (The Business Core)
- **Framework:** Django Rest Framework (DRF)  
- **Responsibilities:**
  - User authentication using JWT
  - Profile management
  - Payment processing logic (interfacing with Navigator Pay)
  - Storing final booking details
  - Managing transactional integrity

> These services require **security**, **data consistency**, and a **powerful ORM**, making Django a natural fit.

#### ⚡ FastAPI Services (The AI & Real-time Edge)
- **Framework:** FastAPI (chosen for asynchronous performance)  
- **Responsibilities:**
  - **Journey Orchestration Service:** Central endpoint receiving user journey requests and forwarding to AI Brain.
  - **Real-time Tracking Service:** Manages live journey updates at high frequency.
  - **FairPrice Service:** Delivers real-time price intelligence based on demand, supply, and external API inputs.

---

### 🤖 The AI Brain (The Intelligence Layer)
- **Technology Stack:** Python, LangChain, LangGraph  
- **Model Providers:** Azure AI Foundry, OpenAI, Anthropic (via API)

#### 🧠 Master Orchestrator (LangGraph)
- Built using **LangGraph** for cyclical, non-linear orchestration.
- Can invoke specialist agents, evaluate responses, and iterate decision-making steps.

#### 🧩 Specialist AI Agents (LangChain)
- Individual **LangChain agents** tailored with:
  - Custom tools (e.g., API wrappers, DB access)
  - Internal memory modules
- Each agent focuses on a particular domain (e.g., transport, pricing, availability).

#### 🗂️ Model Context Protocol (Memory)
- **Powered by:** LangChain Memory Modules  
- Ensures context is preserved across interactions for:
  - Coherent, stateful conversations
  - Consistent multi-turn journey planning
  - Personalized AI behavior

---

### 💾 Data Stores
- **Technologies Used:**
  - **Azure Cosmos DB** — Document store for user data
  - **PostgreSQL** — Relational DB for transactional and journey data (via Django ORM)
  - **Redis** — Real-time cache and session memory

> Django services mainly interface with **PostgreSQL**, while **FastAPI** services are designed to access **all three**, depending on the use case.


## 4. External World - API Dependencies (High-Level)

Our platform's intelligence is fueled by real-time data from a variety of external, third-party APIs. Our AI Agents act as the sophisticated consumers of these APIs. This is a high-level overview of the critical categories and potential providers. Detailed analysis and final selection will be in the `07_API_BIBLE.md` document.

*   **A. Mapping, Navigation & Traffic:**
    *   **Purpose:** The foundational layer for all journey planning. Provides route options, real-time traffic data, and travel time estimations for road-based transport.
    *   **Primary Candidates:** Google Maps Platform (Directions API, Distance Matrix API, Geocoding API), MapmyIndia APIs.
    *   **Consumed By:** `LocalTransitAgent`.

*   **B. Ride-Hailing & Taxis:**
    *   **Purpose:** To get real-time availability, estimated time of arrival (ETA) for pickups, and fare estimates. In later phases, this will be used for direct booking.
    *   **Primary Candidates:** Uber API, Ola API (if public access is available), local city-based taxi aggregators.
    *   **Consumed By:** `LocalTransitAgent`.

*   **C. Public Transit - Rail & Bus:**
    *   **Purpose:** To get schedules, live running status, platform numbers, seat availability, and booking capabilities. This is the backbone of our long-distance travel orchestration.
    *   **Primary Candidates:**
        *   **Rail:** Partnering with B2B IRCTC providers like RailYatri, Ixigo, or others for reliable PNR status and booking APIs. Direct use of NTES for live status where possible.
        *   **Bus:** RedBus API, AbhiBus API, or other major bus aggregators.
    *   **Consumed By:** `RailAgent`, `BusAgent`.

*   **D. Accommodation:**
    *   **Purpose:** To search for and book hotels, guesthouses, etc., as part of a complete travel itinerary.
    *   **Primary Candidates:** Aggregators like TBO Holidays, Amadeus, or directly with OTAs like MakeMyTrip/Goibibo if they have B2B APIs.
    *   **Consumed By:** `HotelAgent`.

*   **E. Payments:**
    *   **Purpose:** To power the "Navigator Pay" wallet. This includes adding money to the wallet, processing payouts to vendors, and managing refunds.
    *   **Primary Candidates:** Razorpay (excellent for its RazorpayX for payouts), PayU, Cashfree.
    *   **Consumed By:** `Navigator Pay Service` (Django).

*   **F. AI Models & Foundation Models:**
    *   **Purpose:** To provide the underlying Large Language Models (LLMs) that power our agents' reasoning and natural language capabilities.
    *   **Primary Source:** **Azure AI Foundry** (your existing asset).
    *   **Secondary Candidates:** OpenAI (GPT-4/Turbo), Anthropic (Claude series) for specific tasks where they may excel.
    *   **Consumed By:** `Master Orchestrator` and all `Specialist AI Agents`.

## 5. Technology Stack Summary (Finalized)

| Component      | Technology Chosen                                   | Reason                                                        |
| -------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| **Cloud**      | Microsoft Azure                                     | Leverages your AI Foundry; excellent PaaS offerings.         |
| **Frontend**   | React.js / Vue.js                                 | Builds a modern, fast, responsive website.                   |
| **Backend (Business Core)** | Django / Django Rest Framework      | Industry-standard for security, data integrity, and robust business logic. |
| **Backend (AI/Real-time)**  | FastAPI                                         | High-performance, asynchronous speed for AI and live data. |
| **AI Agents**    | LangChain & LangGraph                           | State-of-the-art framework for building complex, stateful agentic systems. |
| **Databases**  | Cosmos DB, PostgreSQL, Redis                      | Polyglot persistence: using the right database for the right job. |
| **External APIs** | Google Maps, Uber, Rail Aggregators, Razorpay, etc. | Provides the essential real-world data to fuel the AI. |