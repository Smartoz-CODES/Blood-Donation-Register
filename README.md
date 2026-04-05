# Blood Donation Register for Donors

## Problem Domain Description

The Blood Donation Register is a system designed to manage and track blood donors, their eligibility status, donation history, and blood inventory at a blood bank. It solves the problem of manual, error-prone record-keeping in blood donation centres by automating donor registration, eligibility verification, and real-time blood stock tracking.

In many developing countries, blood banks still rely on paper-based registers to record donor information. This approach is time-consuming and prone to human error, duplication, and data loss. Critical details such as a donor's last donation date, medical eligibility, and blood type availability can be misplaced or overlooked, leading to unsafe transfusion practices or wasted blood units. The Blood Donation Register addresses these challenges by providing a centralized, digital solution that enforces medical guidelines automatically.

The system manages two core entities: Donors and Blood Banks. Each donor is registered with essential details including their name, age, blood type, and weight. The system assigns a unique donor ID upon registration and maintains a complete donation history for each individual. Before any donation is processed, the system performs an eligibility check — the donor must be between 18 and 65 years old, weigh at least 50 kilograms, and must not have donated within the previous 56 days. If any condition is not met, the donation is rejected with a clear reason provided.

On the blood bank side, the system tracks real-time inventory across all eight major blood types (A+, A-, B+, B-, AB+, AB-, O+, O-). Administrators can view available stock levels, search for donors by blood type during emergencies, and monitor system-wide statistics such as total registered donors and total units collected across multiple facilities.

The primary users of this system are blood bank staff, hospital administrators, and healthcare coordinators responsible for maintaining safe and adequate blood supply levels. By digitizing the donation workflow, the system reduces administrative burden, minimizes errors, ensures donor safety, and ultimately helps save lives through better blood resource management.

## UML Class Diagram

![UML Class Diagram](./Media/UML_Class_Diagram.drawio)
