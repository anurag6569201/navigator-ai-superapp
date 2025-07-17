# The API Bible: External Service Integrations

## 1. Document Purpose

This document serves as the central repository for all research, analysis, and strategic decisions regarding third-party API integrations. It is a living document that will be continuously updated as we evaluate and onboard new partners. Our platform's reliability is directly tied to the reliability of the services listed here.

**Evaluation Criteria for Each API:**
*   **Performance & Reliability:** How fast is the API? What is its guaranteed uptime (SLA)?
*   **Data Quality:** Is the data accurate, up-to-date, and comprehensive?
*   **Pricing Model:** Is it affordable? Does it scale predictably? Is there a free tier for development?
*   **Documentation & Support:** Is the documentation clear? Is the developer support responsive?
*   **Ease of Integration:** How complex is the initial integration? Do they provide sandbox environments?

---

## 2. API Integration Strategy & Priority

| Priority | Category                        | Status           | Primary Candidates                                       | Owner      | Notes                                                              |
| :------- | :------------------------------ | :--------------- | :------------------------------------------------------- | :--------- | :----------------------------------------------------------------- |
| **P0 - MVP Critical** | **Mapping & Traffic**           | `Not Researched` | Google Maps Platform, MapmyIndia                         | `Lead Dev` | The absolute foundation for our MVP. Must be 100% reliable.          |
| **P0 - MVP Critical** | **Ride-Hailing (Data)**         | `Not Researched` | Uber API, Ola API (if available)                         | `Lead Dev` | MVP only requires fare/ETA estimates, not booking.               |
| **P0 - MVP Critical** | **Public Transit (Mumbai)**     | `Not Researched` | M-Indicator (scraping?), Chalo API                        | `Lead Dev` | This is a major risk. A reliable source is critical for the MVP. |
| **P1 - Phase 2 Core** | **Rail - Info & Booking**       | `Not Researched` | RailYatri, Ixigo, TBO                                    | `Biz Dev`  | Requires a formal B2B partnership with an IRCTC principal agent.     |
| **P1 - Phase 2 Core** | **Payments**                    | `Not Researched` | Razorpay, PayU                                           | `Biz Dev`  | Must support wallet functionality and multi-vendor payouts.        |
| **P2 - Super App**    | **Bus - Info & Booking**        | `Not Researched` | RedBus, AbhiBus                                          | `Biz Dev`  |                                                                    |
| **P2 - Super App**    | **Accommodation**               | `Not Researched` | TBO, EaseMyTrip B2B, Amadeus                             | `Biz Dev`  |                                                                    |
| **P2 - Super App**    | **AI Foundation Models**        | `On-hand`        | Azure AI Foundry, OpenAI API, Anthropic API              | `AI Lead`  | Already have access to Azure. Will evaluate others for specific tasks. |

---

## 3. Detailed Research Sections

*(This is where the deep research will go. We will create a section for each P0/P1 item)*

### **A. Mapping & Traffic API**

*   **Provider:** Google Maps Platform
    *   **APIs Needed:** `Directions API`, `Distance Matrix API`, `Geocoding API`.
    *   **Pricing:** Pay-as-you-go model. Comes with a recurring monthly free credit. We need to estimate our monthly call volume to project costs.
    *   **Data Quality:** Considered the industry gold standard for real-time traffic and routing accuracy.
    *   **Key Questions to Answer:**
        1.  What is our projected monthly cost for the MVP launch in Mumbai (est. 100k direction requests/month)?
        2.  What are the exact rate limits we need to be aware of to prevent service disruption?

*   **Provider:** MapmyIndia
    *   **APIs Needed:** Equivalent routing and geocoding APIs.
    *   **Pricing:** Typically involves enterprise licensing or volume-based pricing. May be more cost-effective at very high scale.
    *   **Data Quality:** Excellent for Indian addresses and hyperlocal geography.
    *   **Key Questions to Answer:**
        1.  Can they provide a more competitive pricing model than Google Maps for an India-focused startup?
        2.  How does their real-time traffic data in Mumbai compare to Google's?

### **B. Ride-Hailing API**

*   **Provider:** Uber API
    *   **APIs Needed:** `Request Estimates` (for price/time), `Ride Request` (for booking in Phase 2).
    *   **Pricing:** Free to use. Standard Uber fares apply to booked rides.
    *   **Documentation:** Generally well-documented with a sandbox environment.
    *   **Key Questions to Answer:**
        1.  What are the rate limits for the fare estimation endpoint?
        2.  Does the API provide real-time ETAs for all Uber products (Auto, Go, Premier)?

*   **Provider:** Ola API
    *   **APIs Needed:** Equivalent estimation and booking APIs.
    *   **Availability:** Historically, Ola's public API access has been limited or deprecated.
    *   **Key Questions to Answer:**
        1.  **CRITICAL:** Is there a publicly available, supported API for developers?
        2.  If not, is a B2B partnership possible? This is a major business development task.

### **C. Payments API**

*   **Provider:** Razorpay
    *   **APIs Needed:** `Payment Gateway` (to add money), `RazorpayX` (for payouts).
    *   **Pricing:** Standard transaction fees (e.g., ~2% per transaction). Payouts may have a separate fee structure.
    *   **Features:** Excellent for the Indian market, supports UPI, cards, net banking. `RazorpayX` is specifically designed for vendor payouts, which is perfect for our model.
    *   **Key Questions to Answer:**
        1.  What are the specific legal and technical requirements for implementing a wallet system using their APIs?
        2.  How does the refund and chargeback process work via the API?