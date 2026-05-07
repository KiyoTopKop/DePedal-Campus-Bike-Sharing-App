# DePedal: Smart Bicycle Sharing System for De La Salle University - Dasmariñas

**Members:**
- Marc Jacob C. Lentejas
- Aerrol John J. Jimenez
- Dylan Paulo F. Nicol

**Adviser:** Prof. Emelyn Mayuga

---

# CHAPTER 1: INTRODUCTION

## Project Context

Universities and cities around the world are adopting more sustainable mobility solutions to address global environmental challenges, many of which align with the United Nations Sustainable Development Goals (SDGs). The United Nations recognizes transportation as one of the most critical areas for achieving these goals, noting that cycling directly supports at least eleven of the seventeen SDGs. This project will focus on certain key goals such as:

- **SDG 1 (No Poverty)** – bicycles are affordable and lower the cost of transportation on households
- **SDG 3 (Good Health and Well-Being)** – quality of air and road safety improves when switching off motorized transport
- **SDG 11 (Sustainable Cities and Communities)** – bicycles offer a cost-effective, safe, and non-polluting mode of transport that strengthens communities
- **SDG 13 (Climate Action)** – cycling contributes to the reduction of greenhouse gas emissions by providing a zero-emission mode of transportation (UNRIC, 2025)
- **SDG 4 (Quality Education)** – long travel distances remain an obstacle to education; students travelling long distances often arrive at class exhausted and late, compromising their ability to concentrate and perform (Action Education, 2024)

Bicycle-sharing systems have been widely adopted across American cities, with Lyft operating Citi Bike, the largest bike renting program in the United States, recording over 246 million all-time rides across New York City and other major urban centers (NYC Mayor's Office, 2024). In the more local projects, the University of the Philippines Los Baños adopted a bike-sharing system called Tipaklong (Araguas, 2024), and a closely similar prototype system called E-WheelShare was developed for the University of Cebu (Salimbangon et al., 2025), demonstrating the growing commitment of Philippine communities to join the cause of SDG. DLSU-D itself has demonstrated awareness of cycling as a sustainable option through its Cycling Campaign and Larga Lasalyano initiatives, which encourage La Salians to adopt sustainable transport including bicycles outside and inside the campus of DLSU-D (DLSU-D, 2026).

De La Salle University - Dasmariñas is a large university spanning 27 hectares in Dasmariñas, Cavite. The university is home to eight colleges and administrative buildings, with students traveling in-between buildings primarily on foot. While two jeepneys called *Ikot La Salle* operate on a fixed campus route, persistent issues include unpredictable waiting time and a one-hour midday service rest for the driver (12:00pm to 1:00pm) during which no jeepney operates. Students who brought their personal vehicles also face parking shortages. These conditions result in students arriving at their classes late and physically exhausted, particularly under the intense heat and humidity of the Philippine climate, a condition that can negatively affect academic performance.

DLSU-D is a university widely recognized for its commitment to sustainability, being recognized as the most sustainable university in the Philippines for 13 consecutive years by the UI GreenMetric World University Rankings (De La Salle University - Dasmariñas, 2024). Promoting a smart bicycle-sharing system is a natural extension of DLSU-D's identity as a sustainability-driven institution, while reinforcing its vision for excellence and drives innovation towards a just, peaceful, and sustainable society (De La Salle University - Dasmariñas, n.d.).

The proposed system is particularly achievable for full implementation due to its integration with existing university infrastructure. DLSU-D currently employs a barcode-based logging system at its library, where student ID barcodes are scanned for entry and record-keeping. Each docking station is equipped with a barcode scanner and an ESP32 DevKit v1 microcontroller that reads the unique barcode on the back of a student's ID. Upon a successful scan, the lock is released, and the user's identity, timestamp, and assigned bicycle unit are recorded in a web-based database. Users must first register through a web application before being allowed to use the bicycle system. The app also manages the student's e-wallet balance — a top-up of ₱50.00 is required for account activation, and a fixed usage fee of ₱5.00 is deducted per 15 minutes, meaning a minimum balance of ₱5.00 must be maintained for the user to initiate any ride session.

A carbon tracking feature is incorporated to estimate the environmental impact of each bicycle ride. Carbon savings are computed using the formula:

> **Carbon Saved (kg CO₂) = Distance (km) × 0.11 kg CO₂e/km** (Harvie, 2021)

Individual savings are shown to users through the mobile app, while cumulative savings are displayed on the admin dashboard.

---

## 1.2 Purpose and Description

### 1.2.1 Purpose

The primary purpose of this project is to develop a smart bicycle-sharing station system that enhances campus mobility within De La Salle University - Dasmariñas through a secure, efficient, and sustainable transportation solution.

The system utilizes barcode-based authentication, automated locking mechanisms, and real-time monitoring to provide students, faculty and staff with an additional option of intra-campus transportation aside from walking, Ikot La Salle, and personal vehicles. By integrating existing student identification infrastructure technology used by the DLSU-D library, the project aims to minimize implementation cost while ensuring ease of adoption among users.

Additionally, the project incorporates GPS tracking and geofencing features to improve security and gives the ability to use docked bicycles. A cashless payment system is also included to maintain its automation of the system. Furthermore, the system tracks estimated carbon emission reduction, to know how much change the user does and supporting the university's environmental initiatives and encouraging eco-friendly transportation among students.

### 1.2.2 Description

This project involves the design and prototype of a smart bicycle-sharing system that utilizes Internet of Things (IoT) attached to bicycles and docking stations. The system integrates both hardware and software components to provide a seamless and efficient transportation solution.

The system consists of the following key components:

1. **Barcode Authentication System** – Reads the barcode located on the back of the student, staff, and faculty identification card for full implementation; custom identification for prototype. This serves as the primary method of user authentication.

2. **Microcontroller (ESP32)** – Processes input data from the barcode scanner, controls the locking mechanism, and manages communication with the cloud-server through wireless connectivity.

3. **Electronic Locking Mechanism** – Secures each bicycle at the docking station. The lock is released only upon successful authentication and verification of sufficient user balance.

4. **GPS Tracking and Geofencing Module** – Transmits location data at intervals of 10 seconds. A geofencing system defines the campus boundary and triggers an alert if a bicycle exits the designated area.

5. **Payment System** – Integrates a digital wallet funded through GCash using a system-generated QR code. Users select from fixed packages:
   - ₱5.00 = 1 ride
   - ₱25.00 = 5 rides
   - ₱50.00 = 10 rides

   A minimum initial top-up of ₱50 is required for account activation. To begin any ride session after activation, the user must maintain a minimum balance of ₱5.00. A fixed fee of ₱5 is deducted per fifteen-minute session.

6. **Logging System** – A centralized web platform records all transactions, including student ID, bicycle ID, overall session cost, and timestamps of departure and arrival.

7. **Web Application** – A user-facing web application that allows students, faculty, and staff to register, manage their e-wallet balance, view available bicycles, track ride history, report bicycle damage, and monitor their individual carbon savings. A separate web-based admin dashboard provides administrators with real-time monitoring of bicycle locations, usage data, total earnings, maintenance, and manual override.

8. **System Notification** – The system provides notifications via Outlook email or Website. These allow the admin to inform users of any upcoming maintenance for the application or the bicycle sharing system. Notifications are also sent when users forget to park their bikes properly.

9. **Carbon Tracking Feature** – Calculates estimated carbon emission reductions based on GPS-logged ride distances providing users and administrators with measurable environmental impact data.

10. **Power Supply System** – Designed to operate using a powerbank connected to a rechargeable battery pack, with a boost converter maintaining stable voltage output to ensure continuous and sustainable operation.

11. **Damage Report** – Allows users to submit reports for physical bicycle issues such as flat tires, broken parts, or malfunctions. Users provide the bicycle ID, select a damage type from a dropdown menu, upload a photograph as evidence, and indicate the location. Submitted reports are routed to the administrator dashboard for review.

---

## 1.3 Objectives of the Study

This study aims to design, integrate, develop, implement, and evaluate a Smart Bicycle Station System for De La Salle University - Dasmariñas. Specifically, it aims to:

1. **Design** an automated locking mechanism for securing and releasing bicycles, and a prototype deployment consisting of two docking stations located at the JFH Kubo and CBAA bicycle racks, and two bicycle units.

2. **Integrate** GPS tracking, geofencing, and motion detection features to enable real-time monitoring of bicycle location, usage, and boundary violations, including carbon tracking based on GPS-logged data.

3. **Develop** a barcode-based authentication system, a usage logging system, and a web-based application that supports user registration, e-wallet management, ride tracking, and an administrative monitoring dashboard.

4. **Implement** the system with an e-wallet payment feature requiring a minimum balance of ₱5.00 and a fixed usage fee of ₱5.00 per 15-minute session; GCash cashless payment packages include: ₱5.00 = 1 ride, ₱25.00 = 5 rides, and ₱50.00 = 10 rides.

5. **Evaluate** the system in terms of functionality, reliability, and user acceptability using functional testing and a user acceptance survey based on the 9 categories of ISO/IEC 25010:2023 quality model (Functional Suitability, Performance Efficiency, Compatibility, Usability, Reliability, Security, Maintainability, Flexibility, and Safety).

---

## 1.4 Scope and Limitations

### Scope

This study covers the design, development, prototype implementation, and evaluation of a Smart Bicycle Station System intended for use within the De La Salle University - Dasmariñas campus. The research encompasses the hardware design of each docking station and bicycle, centered on an ESP32 microcontroller (T-A7608E-H ESP32-S3 for bicycles and Devkit v1 for docking station).

For the purposes of prototype testing, surveys, and system evaluation, the study will use already available bicycle racks inside the campus of DLSU-D:
- **Station A** – JFH Kubo bicycle racks
- **Station B** – CBAA grounds bicycle racks

Two bicycle units will be used. This controlled space provides sufficient data to assess system performance and user experience without requiring full campus-wide implementation.

**User Roles:**

| Role | Description |
|------|-------------|
| End Users | Students, faculty, and staff who access the web application to register, top up their e-wallet, view ride history, track carbon savings, and report bicycle damage |
| Administrators | Authorized personnel who access the web-based dashboard to monitor transactions, view GPS locations, generate reports, manage user accounts, configure system settings, review damage reports, and perform manual overrides |

**Registration Requirements:**

To use the bicycle sharing system for the first time, the user must register on the DePedal website. The registration form will ask for:
- Student ID
- User type (Student, Faculty, Staff)
- Department (CLAC, CICS, CBAA, CTHM, CEAT, COED, CCJE, or COS — not required for staff)
- Outlook email address

After registration, the user must top up ₱50.00 as their initial balance via GCash, which provides them with ten rides.

**Top-up Packages:**

| Package | Amount | Rides |
|---------|--------|-------|
| Basic | ₱5.00 | 1 ride |
| Standard | ₱25.00 | 5 rides |
| Value | ₱50.00 | 10 rides |

**Penalty System:**

- Temporary student ID ban: one week to one month
- Permanent ID ban for repeated offenses
- Payment for damage or loss of hardware
- Intentional damage or theft: reported to SWAFO, payment of 2× the hardware price

**System Quality Evaluation (ISO/IEC 25010:2023):**

| Characteristic | Description |
|---------------|-------------|
| Functional Suitability | All system functions work as intended (barcode scanning, lock release, GPS tracking, geofence alerts, credit deduction) |
| Performance Efficiency | Scan-to-unlock in under 10 seconds; GPS transmits at consistent 10-second intervals |
| Compatibility | Communication between ESP32, barcode scanner, GPS, SIM7600G-H, web application, and cloud database |
| Usability | Easy to understand and operate with little technical training |
| Reliability | Stable connectivity during active rides; consistent lock behavior |
| Security | Custom barcode authentication, HTTPS and SSL/TLS encryption, and penalty system |
| Maintainability | Firmware updates and administrator parameter changes through maintenance module |
| Flexibility | Ability to add docking stations, update geofence coordinates, and operate under alternative network conditions |
| Safety | Alarm-only geofence response that avoids wheel locking during active rides |

### Limitations

1. The prototype is limited to two docking stations and two bicycles.
2. Only official DLSU-D identification card barcodes are recognized; visitors or students who have lost their IDs are not included.
3. The prototype uses custom barcodes generated upon registration; integration with the official DLSU-D barcode system is proposed for full implementation.
4. The prototype utilizes a power bank as the primary charger source; solar panels or direct electrical connections are recommended for full implementation.
5. The system exclusively employs barcode scanning; RFID, NFC, and biometric recognition are outside scope.
6. Durability, weather resistance, and long-term physical maintenance are not evaluated within this study's timeframe.
7. The system prevents access when: zero account balance, active unpaid penalty, deactivated account, or no bicycles available.
8. Registration is exclusively available to students, faculty, and staff of official DLSU-D.
9. Carbon tracking is an estimation, not a direct measurement.
10. Notifications are delivered exclusively through institutional Outlook email or in-web push notifications.

---

## 1.5 Definition of Terms

**Autonomous System** – The docking station's ability to automatically lock and unlock bicycles and process cashless payment without manual staff intervention.

**Barcode Authentication** – The use of a unique custom barcode generated upon user registration to verify identity at the docking station scanner.

**Carbon Tracking** – The system's automatic computation of estimated CO₂ savings per ride using the formula: Carbon Saved (kg CO₂e) = Distance (km) × 0.11 kg CO₂e/km.

**Docking Station** – The fixed physical structure at each station location where bicycles are stored and locked, equipped with an ESP32 DevKit v1 microcontroller, barcode scanner, reed switches, and LED indicators.

**E-Wallet** – The digital wallet within the web application where users load ride credits. Minimum initial top-up of ₱50.00 required for account activation; ₱5.00 deducted per 15-minute session.

**ESP32 DevKit v1** – The low-cost, Wi-Fi-enabled microcontroller serving as the processing unit of each docking station.

**A7608E-H ESP32-S3** – The microcontroller with built-in Wi-Fi and GPS module serving as the processing unit of each bicycle.

**Geofencing** – The virtual boundary around the DLSU-D campus that triggers an audible alarm, penalty deduction, and admin notification when a bicycle exits the designated area.

**GPS (Global Positioning System)** – The satellite-based navigation system used to transmit real-time bicycle location data to the server at ten-second intervals.

**IoT (Internet of Things)** – The network of interconnected hardware components and software systems forming the DePedal system's automated ecosystem.

**ISO/IEC 25010:2023** – The international quality standard used to evaluate the system across nine quality characteristics for IoT systems.

**Maintenance Module** – The administrator-exclusive feature that allows authorized personnel to update system parameters without modifying source code.

**Manual Override** – The administrator's ability to remotely trigger a lock release for a specific docking slot through the dashboard in the event of a system failure.

**Web Application** – The browser-based platform serving user and administrator interfaces.

**Penalty System** – Applied when a bicycle exits the campus geofence boundary or in cases of damage or loss.

**Reed Switch** – The magnetic sensor mounted on the bicycle frame that detects wheel rotation.

**Report Module** – The administrator-exclusive feature that generates printable reports on ride counts, revenue, penalty records, and carbon savings.

**Smart Lock** – The servo-controlled locking mechanism that remains engaged by default and releases only upon successful authentication.

**Terms of Use** – The agreement presented to users upon registration outlining rules governing system use.

**Top-up** – The process of loading ride credits into a user's e-wallet through GCash.

**Web-based Logging System** – The centralized admin dashboard that holds and displays all records.

---

# CHAPTER 2: REVIEW OF RELATED LITERATURE AND STUDIES

This chapter reviews the literature and studies that shaped how the researchers designed DePedal. Sources come from peer-reviewed publications, conferences, and institutional documents dating back to 2022. These sources have been categorized into four categories: local literature, local studies, foreign literature, and foreign studies.

## Local Literature

**Gaspar et al. (2023)** surveyed people in Metro Manila and the Calabarzon area using the Extended Theory of Planned Behavior to examine factors influencing Filipino consumers' readiness to use bicycles and electric scooters. Three critical elements were found to be especially significant: environmental accountability, usefulness of the means of transport, and affordability. Campus-owned parking spaces charging relatively low fares received the most positive score. This directly pertains to DePedal's ₱5 per 15 minutes pricing scheme.

**Napalang (2024)** examined how students navigate the University of the Philippines Diliman campus. Findings consistent with DLSU-D students showed that walking is a means of getting somewhere when no other options are available rather than a preferred method. Two key needs emerged: ease of access to transport without prior arrangements, and accountability to identify responsible users when problems occur.

**Tolentino (2022)** studied walking and cycling patterns in Metro Manila and found that cycling for shorter distances led to less felt heat stress compared to walking the same distances due to decreased time spent outdoors. This validates the decision to place Station A at JFH Kubo and Station B at CBAA grounds, as both are destination points students actually go to.

**Laguna (2023)** argued that when a university installs bike infrastructure, it sends a message beyond just offering transport — it demonstrates that sustainability is important to the university. DePedal is consistent with what DLSU-D already stands for as a 13-time sustainability leader in Philippine universities.

**Tipaklong (2024) / UPLB (2024)** reported that the UPLB bike-sharing pilot logged 22,000 rides and reduced about 4,000 kg of CO₂ emissions within one year. However, it uses mobile app registration, which poses problems for students without sufficient data plans. DePedal solves this by using existing DLSU-D ID barcodes.

## Local Studies

**Agripa and Astillero (2022)** developed a QR code scanning system at Sorsogon State University where each scan required less than five seconds, and initial use was completed independently by participants — crucial for DePedal since no attendants will be present at docking stations.

**EVSU (2022)** developed a QR cloud attendance system where no proxy attendance was observed, with positive performance assessments regarding reliability and usability.

**PUP Ragay (2022)** examined barcode patterns among 713 students and concluded that barcode patterns embedded on Philippine ID cards are compatible with existing optical scanners without requiring card alterations. Each scan-to-log process took less than five seconds.

**Salimbangon et al. (2025)** created E-WheelShare at the University of Cebu, registering more than 2,000 trips averaging about twelve minutes each — consistent with DePedal's 15-minute session maximum. However, the system lacked user identity verification, making it impossible to determine the last user in cases of theft or damage. DePedal's barcode scanner solves this gap.

## Foreign Literature

**Zhou et al. (2022)** reviewed 62 bike-sharing systems worldwide and identified four generations of evolution. The fourth generation — which DePedal belongs to — integrates GPS tracking, IoT lock, electronic logging of each rider's identification, and geofencing, showing superior customer satisfaction, bicycle redistribution, and theft prevention.

**Liu et al. (2022)** compared geo-constrained versus unrestricted bike fleets, finding significantly fewer cases of stolen bikes and illegal parking in geo-constrained fleets. They determined that GPS updates every 10 seconds are sufficient for boundary enforcement, and the delay between crossing a boundary and locking activation should be set at 30-60 seconds.

**Shevchenko and Reips (2023)** tested geofencing behavioral effects across Europe and Asia, finding that a response window of 30-60 seconds provides sufficient time for users to recognize boundary violations. The most efficient response was instantaneous loud noise followed by a delayed electronic lock — the same two-part approach used by DePedal.

**Fu et al. (2023)** developed an algorithmic approach for optimal bike-sharing station location at a Chinese university of 25-30 hectares (close to DLSU-D's 27 hectares). They found that 6-8 stations are optimal for full campus coverage, with highest usage near university gates and large academic structures.

**Zhu et al. (2022)** found that proximity to destination is the most effective factor in bike-sharing usage, more so than bike quality, app design, or rental price. Station-based docked systems outperformed dockless systems in theft protection, user identity monitoring, and redistribution.

**Sgarra et al. (2022)** surveyed Sapienza University and found that campuses with physical docking stations, digital tracking devices, and individual identification systems had greater bicycle use. Accountability aspects should be considered a core element, not an option.

## Foreign Studies

**KMITL (2023)** implemented a smart bike-sharing trial at King Mongkut's Institute of Technology Ladkrabang in Bangkok, incorporating solar charging stations, student ID check-out, GPS map visibility, and a notification system. Not a single bicycle was ever reported missing with GPS activation. However, the KMITL trial did not publish its scan-to-unlock time metric — DePedal's evaluation plan under ISO/IEC 25010:2023 includes this measurement.

**Zhao et al. (2025)** presented data from over 220,000 trips involving over 53,000 bicycles in Xiamen, China, demonstrating that GPS data every 30 seconds is sufficient to accurately map trip routes. DePedal's 10-second interval is three times faster than this established minimum.

**IJEEEMI (2024)** published the most technically similar system to DePedal, featuring optical code authentication, cloud logging, GPS, and electronic locking. Testing showed check-out in under 10 seconds and GPS accuracy within 3-5 meters. What makes DePedal unique are three absent features: carbon emissions calculation, GCash digital wallet payment, and a reed switch sensor for wheel rotation detection.

## Synthesis

All sources indicate three directions for DePedal's design:

1. **Demand** — Students in the Philippines move within campus because they have no other option. Low cost and instant availability are key drivers. DePedal's ₱5 fee, walk-up barcode access, and strategic station placement address this.

2. **Authentication** — Multiple Philippine university studies confirm that barcode/QR code scanning takes less than 5 seconds and students successfully complete the process independently on the first attempt.

3. **Architecture** — Integrating barcode verification, GPS, electronic locking, and cloud-based logging in a single mechanism is technically feasible for campus environments (KMITL, 2023; IJEEEMI, 2024).

## Research Gaps

1. No current documented Philippine bike-sharing service integrates barcode verification, GPS, geofencing, digital wallet payment, personal carbon tracking, and automatic administrative reports in a single platform.

2. Current Philippine bike-sharing solutions cannot attribute damage to individual users due to missing identity verification in IoT devices.

3. No existing Philippine solution allows modifying operational parameters (ride price, penalty rate) through module configuration rather than source code modification.

4. No Philippine institution manages to integrate automated penalty mechanisms, geofencing, user damage reporting, and an administrative reporting dashboard in one process flow.

5. Globally verified applications (KMITL, IJEEEMI) lack carbon monitoring, e-wallet payment, and wheel motion detection; IJEEEMI uses OTP authentication instead of ID cards.

DePedal aims to solve all five identified gaps.

---

## Conceptual Framework

```
INPUT                   PROCESS                 OUTPUT
─────────────────────   ─────────────────────   ─────────────────────
• Student ID barcode    • Barcode               "DePedal: Smart
• Registration data       authentication          Bicycle Sharing
• GCash top-up          • E-wallet balance        System for
• GPS satellite           validation              De La Salle
  signals               • Smart lock control      University -
• Reed switch sensor    • GPS tracking            Dasmariñas"
  data                    (10-second interval)
• Geofence              • Geofence boundary
  coordinates             enforcement
• Admin configuration   • Reed switch idle
  parameters              detection
• DOE emission factor   • Penalty auto-
  (0.11 kg CO₂e/km)      deduction
• User damage reports   • Carbon savings
                          computation
                        • Email notification
                          dispatch
                        • Admin dashboard &
                          manual override
```

*Figure 1. Conceptual Framework of DePedal Using the IPO Model*

The inputs consist of raw data and physical signals including barcodes, registration details validated through the DLSU-D Outlook email algorithm, GCash-based top-up packages, GPS signals, and Reed Switch data. The administrator supplies configurable parameters such as ride pricing and penalty rates through the maintenance module.

The carbon savings formula used is:

> **Carbon Saved (kg CO₂e) = Distance (km) × 0.11 kg CO₂e/km**

During the process stage, the system authenticates the user barcode, conducts a balance check, and activates the servo motor locking mechanism (MG996R) — a process confirmed by literature to be completable in less than ten seconds. When active, the GPS transmits location every ten seconds, three times faster than Zhao et al.'s validated minimum. The geofencing system continually checks whether the bike remains inside the rectangular DLSU-D boundary using methods validated by Pontarollo et al. (2022).

---

# CHAPTER 3: METHODOLOGY

## Research Design

This study employs a **developmental and descriptive research design** to address the problem of intra-campus travel at De La Salle University - Dasmariñas.

- **Developmental design** — Documents the process of designing, constructing, and developing the IoT-based bicycle access system, following stages of requirement analysis, component selection, system integration, and iterative testing.
- **Descriptive design** — Applied to system evaluation through surveys measuring user perception across the nine ISO/IEC 25010:2023 quality categories.

## Project Design

### Network Design Methodology

The design methodology follows a structured four-phase approach consistent with Zhou et al.'s (2022) fourth-generation bike-sharing framework:

1. **Requirement Analysis**
2. **Logical Design**
3. **Physical Design**
4. **Testing**

### Requirement Analysis

#### Software Requirements

**Functional Requirements:**

| Module | Description |
|--------|-------------|
| User Authentication | Barcode-based authentication using DLSU-D user ID; custom barcode system for prototype |
| User Logging | Records student ID, Bicycle ID, departure and arrival timestamps |
| User Dashboard | Registration, e-wallet management, available bikes, ride history, carbon savings, damage reports |
| Damage Report | Users submit bicycle issues with bicycle ID, damage type, photo evidence, and location |
| Admin Analytics | Total rides, daily revenue, penalty records, carbon savings, user statistics by type and department |
| Payment & Wallet | GCash integration; minimum ₱5.00 balance to unlock; ₱5.00 per 15-minute interval |
| Admin Dashboard | Full transaction access, maintenance module, parameter adjustment without source code modification |
| GPS & Geofencing | Real-time bicycle location monitoring; audible alarm and dashboard alert on boundary crossing |
| Balance Enforcement | Prevents unlock if insufficient balance |
| Manual Override | Remote lock/unlock by administrator in case of system failure |

#### Hardware Requirements

**Functional Requirements:**

| Component | Specification |
|-----------|--------------|
| Docking Stations | 2 units (JFH Kubo and CBAA grounds); ESP32 with Wi-Fi, digital I/O for lock control, and serial communication |
| Barcode Scanner | Reads DLSU-D ID barcode format at each docking station |
| Electronic Lock | Motorized lock, normally locked; releases on successful authentication |
| Bicycle Audible Alarm | Speaker activated when bicycle passes geofenced area |

**Non-Functional Requirements:**

| Requirement | Specification |
|-------------|--------------|
| Power Supply | 12V DC power supply with weather-resistant case |
| Bicycle GPS | Location updates every 10 seconds |

#### Network Requirements

**Functional Requirements:**

| Requirement | Specification |
|-------------|--------------|
| Wi-Fi Connection | T-A7608E-H ESP32-S3 with built-in SIM slot for data connection |
| GPS Data Transmission | Location data sent to server over cellular network or campus Wi-Fi |

**Non-Functional Requirements:**

| Requirement | Specification |
|-------------|--------------|
| Server Hosting | Cloud-based server for web logging system and application backend |

### Network Design Models

| Model | Description |
|-------|-------------|
| Centralized Database | All transaction logs, account balances, and bicycle status stored centrally for consistency and simplified reporting |
| Event-driven GPS Distribution | Local processing at each docking station for barcode scans, lock control, and transaction caching to reduce unlock latency |
| Geofencing | GPS coordinates define boundary; both bike GPS and main server check for boundary violations |
| Session Management | Each bike use is a session (max 15 minutes); starts with successful barcode scan and lock release; ends when bike is returned |

### Architecture

Based on Device Authority (2023), the system follows four IoT architecture layers:

**Layer 1: Physical/Perception Layer**

Forms the foundation of the DePedal IoT system. Components:
- *Docking Station:* ESP32 DevKit v1, GM65 barcode scanner, reed switches, LED indicators
- *Bicycle Unit:* A7608E-H ESP32-S3, cellular module (4G/LTE), reed switch and wheel magnet, active buzzer

**Layer 2: Connectivity/Network Layer**

Enables data transmission from physical layer to central server:
- Docking station ESP32 connects via campus Wi-Fi
- Bicycle A7608E-H ESP32-S3 communicates via 4G/LTE cellular connectivity
- All data transmitted securely via HTTPS and SSL/TLS encryption

**Layer 3: Data Processing Layer**

Responsible for analyzing, validating, and acting upon transmitted data:
- Processes barcode authentication against registered user database
- Validates e-wallet balances before authorizing lock release
- Automatically deducts ride credits every fifteen minutes
- Evaluates GPS coordinates against geofence boundary
- Applies carbon savings formula for each completed ride

**Layer 4: User Interface/Application Layer**

Interfaces for users and administrators:

*User Web Application:*
- Account registration and management
- Ride credit purchase (₱5.00, ₱25.00, ₱50.00 packages)
- Current balance and ride history
- Outlook email notifications
- Carbon savings monitoring
- Available bicycle visibility
- Damage report submission

*Administrator Dashboard:*
- Real-time GPS map of all bicycle locations
- Bicycle availability status (in-use, docked, unavailable)
- Transaction logs (user ID, school email, Bicycle ID, timestamps)
- Total earnings per day
- Carbon savings metrics and penalty records
- Report generation (exportable to PDF)
- Maintenance parameter controls
- Manual bicycle override capabilities

### Equipment Analysis

| Component | Function | Unit Price (PHP) | Qty | Total (PHP) |
|-----------|----------|-------------------|-----|-------------|
| FiA7608E-H ESP32-S3 | Main microcontroller for bicycles (GPS, cellular) | 2,733.28 | 2 | 5,466.56 |
| ESP32 DevKit v1 | Main microcontroller for docking stations | 365.00 | 2 | 730.00 |
| GM65 Barcode Scanner | Reads student ID barcode for authentication | 1,019.41 | 2 | 2,038.82 |
| MG996R Servo Motor | Controls bicycle locking pin | 1,221.65 | 2 | 2,443.30 |
| GOMO SIM Card | 15GB no-expiry data SIM for cellular connectivity | 149.00 | 4 | 596.00 |
| Reed Switch + Magnet | Detects wheel rotation for idle status detection | 48.97 | 2 | 97.94 |
| INR18650 (3500mAh) | Rechargeable power storage for stations and bicycles | 941.46 | 2 | 1,882.92 |
| 2-Cell 18650 Battery Holder | Holds battery cells on bicycle frame | 158.37 | 2 | 316.74 |
| Powerbank | Portable rechargeable battery to recharge INR18650 pack | 389.00 | 4 | 1,556.00 |
| **TOTAL** | | | | **₱15,128.28** |

### Security Measures

1. **Barcode Authentication Security** — Access restricted using barcode-based authentication; each barcode is uniquely assigned to a user.
2. **Balance Verification** — Minimum account balance required; system automatically prevents unlocking if insufficient funds.
3. **Automated Locking Mechanism** — Electronic lock remains locked by default; releases only upon successful authentication.
4. **GPS Tracking and Geofencing** — Real-time location monitoring; audible alarm and dashboard notification triggered on boundary exit.
5. **Data Logging and Monitoring** — All transactions recorded centrally, enabling tracing of the last user in cases of misuse, loss, or damage.
6. **Secure Data Transmission** — Data protected through standard communication protocols to reduce interception risk.
7. **Administrative Control** — Only authorized administrators have access to the system dashboard.

---

## Implementation Plan

The implementation follows four phases:

**Phase 1: Hardware Assembly**
- Install ESP32 microcontroller and barcode scanner at each docking station
- Install GPS module on each bicycle frame
- Configure electronic lock on each bicycle to unlock only after successful verification

**Phase 2: Software Development**
- Develop web-based system for automatic recording of user identity, timestamp, and assigned bicycle
- Implement scan-to-authenticate → auto-log to database → timestamp-generation process
- Each transaction logged in under ten seconds

**Phase 3: GPS and Geofencing**
- Establish geofencing parameter around DLSU-D campus boundary
- GPS location updates every 10 seconds or less when bicycle is in motion
- Alarm triggered 30 seconds after leaving boundary

**Phase 4: Prototype Deployment and Evaluation**
- Deploy at JFH Kubo and CBAA grounds (one bicycle per station)
- Conduct functional testing of all hardware and software components
- Administer user acceptance survey to 50 participants based on ISO/IEC 25010:2023

---

## Respondents of the Study

A total of **50 respondents** will participate in prototype testing, employing **purposive sampling** to ensure informed, contextually grounded feedback.

| User Type | Quantity | Percentage |
|-----------|----------|------------|
| Student | 30 | 60% |
| Faculty and Staff | 10 | 20% |
| Admin | 5 | 10% |
| IT Expert | 5 | 10% |
| **Total** | **50** | **100%** |

The sample size of 50 meets the minimum requirement of 40 respondents for descriptive survey research (Budiu & Moran, 2021) and is consistent with comparable Philippine IoT prototype studies (Salimbangon et al., 2025; EVSU, 2022; PUP Ragay, 2022).

---

## Data Gathering Instruments

User survey questionnaires (via Google Forms) will be distributed to 50 respondents after they have used the prototype. Survey items assess:
- Ease of use
- Speed of authentication
- Duration and reliability of locking/unlocking mechanism
- Usefulness in reducing travel time
- Overall system satisfaction

Items are structured based on the nine ISO/IEC 25010:2023 quality categories.

---

## Statistical Treatment of Data

**Four-Stage Process:**

| Stage | Activities |
|-------|-----------|
| Stage 1: Preparation | Formulate survey questions, obtain university permission, get participant consent |
| Stage 2: Data Collection | Brief participants, distribute and retrieve surveys, collect automated usage logs |
| Stage 3: Analysis and Discussion | Sort survey answers, summarize usage log data, apply basic statistics |
| Stage 4: Final Paper | Present findings, draw conclusions and recommendations |

**Statistical Formula:**

The study uses arithmetic mean to analyze survey responses:

$$\bar{x} = \frac{\sum fx}{n}$$

Where:
- *f* = frequency of each response
- *x* = numerical value assigned to each response
- *n* = total number of respondents (n = 50)

---

# REFERENCES

Adams, E., Rodriguez, Y., & Lyft. (2024, December 13). Mayor Adams announces major expansion of Citi Bike service in outer boroughs as ridership continues to soar. *NYC Mayor's Office.* https://www.nyc.gov/mayors-office/news/2024/12/mayor-adams-major-expansion-citi-bike-service-outer-boroughs-ridership-continues

Action Education. (2024). World Bike Day 2024: Pedalling towards progress. https://action-education.org/en/world-bicycle-progress-day/

Agripa, D. J. B., & Astillero, S. F. (2022). Development of employee attendance and management system using quick response (QR) code in Sorsogon State University, Castilla Campus, Philippines. *European Journal of Education Studies, 9*(11), 309–318. https://doi.org/10.46827/ejes.v9i11.4470

Araguas, K. (2024, July 8). UPLB launches Tipaklong, PASEO EduTour. UPLB. https://uplb.edu.ph/all-news/uplb-launches-tipaklong-paseo-edutour/

Budiu, R., & Moran, K. (2021, July 25). How many participants for quantitative usability studies. *Nielsen Norman Group.* https://www.nngroup.com/articles/summary-quant-sample-sizes/

De La Salle University – Dasmariñas. (2024). DLSU-D awards on sustainability. https://www.dlsud.edu.ph/sustain/awards.htm

De La Salle University – Dasmariñas. (2026, March 13). Sustainable transportation. https://www.dlsud.edu.ph/sustain/programs/transportation.htm

De La Salle University – Dasmariñas. (n.d.). Vision and mission. https://www.dlsud.edu.ph/aboutDLSUD/visionMission.htm

Device Authority. (2023, September 16). Unpacking IoT architecture: Layers and components explained. https://deviceauthority.com/unpacking-iot-architecture-layers-and-components-explained/

Eastern Visayas State University. (2022). Utilizing QR codes for smart and low-cost student attendance acquisition and monitoring system. *IEEE HNICEM.* https://doi.org/10.1109/HNICEM57413.2022.10109547

Fu, J., Shi, Y., Hu, Y., Qin, Y., & Chen, Y. (2023). Location optimization of on-campus bicycle-sharing electronic fences. *Management System Engineering, 2*(11). https://doi.org/10.1007/s44176-023-00020-9

Gaspar, R. M., Prasetyo, Y. T., Mariñas, K. A., & Persada, S. F. (2023). Exploring consumers' intention to use bikes and e-scooters during the COVID-19 pandemic in the Philippines. *Sustainability, 15*(6), 5193. https://doi.org/10.3390/su15065193

International Journal of Electrical, Electronics, and Mechatronics Engineering. (2024). Smart IoT-based bicycle access and monitoring system. https://ijeeemi.org/index.php/ijeeemi/article/download/123/236/1666

ISO/IEC. (2022). ISO/IEC 25010: Systems and software quality models. https://iso25000.com/index.php/en/iso-25000-standards/iso-25010

King Mongkut's Institute of Technology Ladkrabang. (2023). Locally designed campus smart bike sharing system. *IEEE Xplore.* https://ieeexplore.ieee.org/document/10315558

Laguna, B. D. P. (2023, February 23). Bicycle mobility initiatives. https://finex.org.ph/2023/02/23/bicycle-mobility-initiatives/

Liu, S., Yildirimoglu, M., & Punzo, V. (2022). Bicycle sharing station planning. *Transportation Research Part A, 164,* 329–345. https://doi.org/10.1016/j.tra.2022.08.017

Napalang, S. G. (2024). Factors that shape transportation mode choices among students. *ResearchGate.* https://www.researchgate.net/publication/384454633

Patrick Harvie. (2021, October 25). Introducing our new carbon calculator. https://www.stepcount.org.uk/blog/introducing-our-new-carbon-calculator

Polytechnic University of the Philippines Ragay Campus. (2022). Student attendance monitoring system. *IEEE HNICEM Proceedings.* https://doi.org/10.1109/HNICEM57413.2022.10109474

Pontarollo, N., Yin, C., He, Q., & Zhang, Y. (2022). Geo-fence planning. *Urban Informatics, 1,* 13. https://doi.org/10.1007/s44212-022-00013-1

Salimbangon, J., Bermudez, L. C., Ferolino, H. M., & Ybañez, L. B. (2025). E-WheelShare. *Journal of Computer Science and Technology Studies, 7*(2). https://doi.org/10.32996/jcsts.2025.7.2.5

Sgarra, V., De Ioris, A., Gori, S., & Nigro, M. (2022). Sustainable mobility in campuses. *Transportation Research Procedia, 60,* 374–381. https://doi.org/10.1016/j.trpro.2021.12.049

Shevchenko, Y., & Reips, U.-D. (2023). Geofencing research. *Behavior Research Methods, 56*(7), 6411–6439. https://doi.org/10.3758/s13428-023-02283-4

Tipaklong Sustainable Mobility Corporation. (2024). Tipaklong-UPLB pilot project. https://tipaklong.com/uplb-pilot

Tolentino, N. J. Y. (2022). Cycling in Metro Manila. *ResearchGate.* https://www.researchgate.net/publication/379289853

United Nations Regional Information Centre. (2025, February 3). Cycling for the global goals. https://unric.org/en/cycling-for-the-global-goals/

University of the Philippines Los Baños. (2024, February 18). Ride-sharing system to revive campus biking. https://uplb.edu.ph/all-news/ride-sharing-system-to-revive-campus-biking/

Zhao, L., Li, X., Chen, X., & Huang, H. (2025). Bicycle dataset. *Scientific Data, 12,* 567. https://doi.org/10.1038/s41597-025-06534-z

Zhou, J., Wang, Y., Zhang, J., & Liu, Y. (2022). Bike-sharing studies review. *Sustainable Cities and Society, 84,* 104028. https://doi.org/10.1016/j.scs.2022.104028

Zhu, L., Chunyan, Z., & Li, X. (2022). Bike-sharing development. *Sustainability, 14*(10), 5795. https://doi.org/10.3390/su14105795
