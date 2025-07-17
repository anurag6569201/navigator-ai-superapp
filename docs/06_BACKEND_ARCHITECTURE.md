# Backend Architecture: Navigator AI

## 1. Guiding Principle: The Right Tool for the Right Job

Our backend is not a single application but a set of cooperating microservices built using two distinct, best-in-class Python frameworks:

*   **Django (with Django Rest Framework):** Our **System of Record**. It is responsible for tasks that demand high security, data integrity, and complex business logic. Think of it as the reliable, transactional core.
*   **FastAPI:** Our **System of Engagement**. It is responsible for tasks that demand high speed, asynchronous operations, and real-time communication. This is the fast, lightweight edge that interacts directly with our AI Brain.

This hybrid approach allows us to avoid the "one size fits all" problem and build a more performant, secure, and maintainable platform.

## 2. Service Breakdown & Responsibilities

### A. The Django Core (Business Logic & Transactions)

This service cluster handles the business-critical, non-real-time aspects of our platform.

*   **`User & Profile Service`**
    *   **Responsibilities:** Manages user registration, login/logout, password management, and user profile data (e.g., saved addresses, travel preferences).
    *   **Authentication:** Implements JSON Web Token (JWT) authentication. It issues tokens upon successful login, which are then used to authenticate requests to all other services via the API Gateway.
    *   **Database Interaction:** Full CRUD (Create, Read, Update, Delete) operations on the `Users` and `Profiles` tables in our PostgreSQL database.

*   **`Booking & Transaction Service`** (Phase 2+)
    *   **Responsibilities:** Manages the lifecycle of a booking after it has been decided by the AI. It stores the final confirmed itinerary, ticket details, and transaction history.
    *   **Data Integrity:** Enforces strict transactional integrity. A booking is either fully confirmed and saved, or it is rolled back completely.
    *   **Database Interaction:** CRUD operations on the `Bookings`, `Tickets`, and `Transactions` tables in PostgreSQL.

*   **`Navigator Pay - Wallet Service`** (Phase 2+)
    *   **Responsibilities:** The financial heart of the user's account. It handles adding money to the wallet, deducting funds for a journey, processing refunds, and maintaining a ledger of all financial activities.
    *   **Security:** This is our most secure service, with stringent validation and logging.
    *   **API Interaction:** Communicates directly with our chosen payment gateway's API (e.g., Razorpay) to process credit card/UPI payments and payouts.

### B. The FastAPI Edge (AI & Real-time Communication)

This service cluster is built for speed and handles the high-volume, often asynchronous, interactions.

*   **`Journey Orchestration Service`**
    *   **Responsibilities:** This is the primary "front door" to our AI. It receives the initial journey planning request from the user's browser (via the API Gateway).
    *   **Workflow:**
        1.  Receives a request (e.g., `POST /api/v1/plan_journey`).
        2.  Performs initial validation.
        3.  Passes the user's goal and constraints to the **Master Orchestrator (LangGraph)**.
        4.  Waits for the AI Brain to return the final, synthesized plan.
        5.  Formats the plan into a clean JSON response and sends it back to the user.
    *   **Key Feature:** It's asynchronous (`async/await`), meaning it can handle thousands of concurrent planning requests efficiently without getting blocked.

*   **`Real-time Tracking Service`**
    *   **Responsibilities:** Manages live updates for an active journey. This service will be a candidate for using WebSockets in the future for even more efficient communication.
    *   **Workflow:** The user's browser will poll this service's endpoint (e.g., `GET /api/v1/journey/status/{journey_id}`) every 15-30 seconds during an active trip. The service then queries the Redis cache for the latest location/ETA data and returns it.

*   **`FairPrice Service`** (Phase 2)
    *   **Responsibilities:** Serves real-time price intelligence data.
    *   **Workflow:** When the user's browser detects a new location (e.g., a market), it calls this service's endpoint (e.g., `GET /api/v1/fair_price?lat=...&lon=...`). The service quickly queries the price database and returns the relevant data. Also handles the intake of new price data submitted by users.

## 3. Inter-Service Communication

*   **User Browser <-> Backend:** All communication goes through the Azure API Gateway.
*   **Django <-> FastAPI:** For the most part, these services operate independently. In the few cases where the FastAPI edge might need business data (e.g., to get a user's travel preference), it will make a secure, internal API call to the appropriate Django service. This keeps the concerns cleanly separated.