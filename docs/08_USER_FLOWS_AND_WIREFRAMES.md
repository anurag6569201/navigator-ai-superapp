# User Flows & Wireframes: Navigator AI

## 1. Document Purpose

This document translates our product strategy and technical architecture into a tangible user experience. It describes the step-by-step journey a user takes to accomplish key tasks on our website. These flows will serve as the blueprint for our UI/UX design and frontend development.

**Guiding Principles for UI/UX:**
*   **Clarity over Clutter:** In moments of stress, users need simplicity. We will always prioritize a clean, intuitive interface.
*   **Minimize Clicks & Taps:** Every action should be achievable with the minimum number of interactions.
*   **Build Trust Through Transparency:** Clearly communicate what the AI is doing and why it's making its recommendations.

---

## 2. Core User Flow #1: The MVP "Crisis Solver"

<table>
<tr>
<td style="width: 70%; vertical-align: top; border: none; padding-right: 20px;">

**Scenario:** "Anxious Amit" has just arrived at Dadar station and realizes his connecting train is from LTT in 55 minutes. He is using our service for the first time on his mobile browser.

*   **Step 1: The Landing Page (Homepage)**
    *   **Wireframe:** A clean page with a single, prominent headline: "In a rush? Let's get you there."
    *   **UI Elements:**
        *   `From:` input field (pre-filled with "Current Location" if permissions are given).
        *   `To:` input field.
        *   A large, inviting `Find a Way` button.
    *   **User Action:** Amit enters "Dadar Railway Station" in `From:` and "LTT" in `To:`, then taps `Find a Way`.

*   **Step 2: The Constraint Input (Optional but important)**
    *   **Wireframe:** A simple, single-question overlay. "Need to be there by a certain time?"
    *   **UI Elements:**
        *   `Time:` input field.
        *   `Skip` button.
    *   **User Action:** Amit enters "in 55 minutes" or the specific time.

*   **Step 3: The "Thinking" Screen**
    *   **Wireframe:** An engaging, non-static loading screen that builds trust.
    *   **UI Elements:**
        *   A progress bar or animation.
        *   Text that explains what the AI is doing: "Analyzing taxi routes...", "Checking real-time traffic...", "Comparing with local train schedules..."
    *   **Purpose:** This screen is crucial. It shows the user that a powerful system is working on their behalf, justifying the few seconds of waiting time.

*   **Step 4: The Recommendation Screen (The "Magic Moment")**
    *   **Wireframe:** A clear, unambiguous, single recommendation at the top.
    *   **UI Elements:**
        *   **Primary Recommendation Card:** Large, bold text: **"Take the Local Train. It's your most reliable option."**
            *   *Details:* "Estimated total time: ~40 mins." "Cost: ~₹25."
            *   *Button:* `Show Me the Steps`
        *   **Secondary Option (De-emphasized):** A smaller, greyed-out card below. "A taxi is available, but risky due to traffic. (Est. time: 45-60 mins, Cost: ~₹350)." This shows the user we considered other options, reinforcing the value of our recommendation.
    *   **User Action:** Amit taps `Show Me the Steps`.

*   **Step 5: The Step-by-Step Guidance Screen**
    *   **Wireframe:** A simple, checklist-style view of the journey.
    *   **UI Elements:**
        *   `Step 1: Walk to the Central Line Platform (Platform 1).` [Show on map]
        *   `Step 2: Board the next SLOW train towards Thane/Kalyan.`
        *   `Step 3: Get off at Kurla Station (4 stops).`
        *   `Step 4: Exit West and take an auto to LTT (5-minute ride).`
    *   **Purpose:** Provides a clear, actionable plan that the user can follow even with minimal cognitive effort.

</td>
<td style="width: 30%; vertical-align: top; border: none;">

[![The MVP "Crisis Solver"](https://github.com/anurag6569201/navigator-ai-superapp/raw/812c2b407699730794dc4b09e816f36277c38ac9/resources/Core-User-Flow.png
)](https://github.com/anurag6569201/navigator-ai-superapp/blob/812c2b407699730794dc4b09e816f36277c38ac9/resources/Core-User-Flow.png
)

</td>
</tr>
</table>

---

## 3. Core User Flow #2: End-to-End Journey Planning (Phase 2)

<table>
<tr>
<td style="width: 70%; vertical-align: top; border: none; padding-right: 20px;">

**Scenario:** "Student Sonia" wants to plan a trip from her home in Satna to her college in Bhubaneswar for next month.

*   **Step 1: The Landing Page**
    *   **User Action:** Sonia enters her home address in `From:` and "IIIT Bhubaneswar" in `To:`. She selects the date for her journey.

*   **Step 2: The "Thinking" Screen**
    *   **Text:** "Planning your full journey...", "Finding optimal trains...", "Calculating first & last-mile travel...", "Comparing prices..."

*   **Step 3: The Itinerary Options Screen**
    *   **Wireframe:** A vertical list of 2-3 fully-orchestrated "Journey Cards." Each card represents a complete, end-to-end plan.
    *   **UI Elements (per card):**
        *   **Card 1 - The "Fastest" Option:**
            *   *Summary:* "Total Journey Time: 26 hours", "Total Cost: ₹1850"
            *   *Details:* Shows a high-level summary: [Auto from Home -> Rajdhani Express -> Cab to IIIT].
        *   **Card 2 - The "Most Economical" Option:**
            *   *Summary:* "Total Journey Time: 30 hours", "Total Cost: ₹1200"
            *   *Details:* [Bus to Station -> Mail Express Train -> Local Bus to IIIT].
    *   **User Action:** Sonia taps on "The Most Economical" option to see the full details.

*   **Step 4: The Detailed Itinerary & Booking Screen**
    *   **Wireframe:** An expanded view of the chosen journey, with each leg clearly laid out.
    *   **UI Elements:**
        *   `Leg 1: Bus from Home to Satna Station` - [Details]
        *   `Leg 2: Satna -> Bhubaneswar via XYZ Express` - [View seat options]
        *   `Leg 3: Local Bus from BBS Station to IIIT` - [Details]
        *   **At the bottom:** A prominent `Book Full Journey for ₹1200` button, which would initiate the booking and payment flow via "Navigator Pay."

</td>
<td style="width: 30%; vertical-align: top; border: none;">

[![End-to-End Journey Planning](https://github.com/anurag6569201/navigator-ai-superapp/raw/812c2b407699730794dc4b09e816f36277c38ac9/resources/End-to-End-Journey-Planning.png)](https://github.com/anurag6569201/navigator-ai-superapp/blob/812c2b407699730794dc4b09e816f36277c38ac9/resources/End-to-End-Journey-Planning.png)

</td>
</tr>
</table>