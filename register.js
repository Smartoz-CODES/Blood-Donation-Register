// ================== BLOOD DONATION REGISTER SYSTEM ==================
// ============== Object-Oriented Programming Implementation in JavaScript ==============

// ============ CLASS 1: Donor ============
class Donor {
  // Static property — tracks total number of registered donors
  static totalDonors = 0;

  constructor(name, age, bloodType, weight) {
    this.name = name;
    this.age = age;
    this.bloodType = bloodType;
    this.weight = weight; // in kg
    this.donationHistory = []; // array of donation date strings
    this.donorId = `DNR-${Donor.totalDonors + 1}`;
    Donor.totalDonors++;
  }

  // Method 1: Check if donor is eligible to donate

  isEligible() {
    const minAge = 18;
    const maxAge = 65;
    const minWeight = 50; // kg

    if (this.age < minAge || this.age > maxAge) {
      return {
        eligible: false,
        reason: `Age must be between ${minAge} and ${maxAge}. Current age: ${this.age}`,
      };
    }
    if (this.weight < minWeight) {
      return {
        eligible: false,
        reason: `Weight must be at least ${minWeight}kg. Current weight: ${this.weight}kg`,
      };
    }

    // Check if last donation was at least 56 days ago

    if (this.donationHistory.length > 0) {
      const lastDonation = new Date(
        this.donationHistory[this.donationHistory.length - 1],
      );
      const today = new Date();
      const daysSinceLastDonation = Math.floor(
        (today - lastDonation) / (1000 * 60 * 60 * 24),
      );

      if (daysSinceLastDonation < 56) {
        return {
          eligible: false,
          reason: `Must wait 56 days between donations. Last donation was ${daysSinceLastDonation} days ago.`,
        };
      }
    }

    return { eligible: true, reason: "Donor meets all eligibility criteria." };
  }

  // Method 2: Record a donation

  recordDonation(date) {
    const eligibility = this.isEligible();
    if (eligibility.eligible) {
      this.donationHistory.push(date);
      return `Donation recorded for ${this.name} on ${date}.`;
    }
    return `Cannot record donation: ${eligibility.reason}`;
  }

  // Method 3: Get donor summary
  getDonorSummary() {
    return `[${this.donorId}] ${this.name} | Age: ${this.age} | Blood Type: ${this.bloodType} | Weight: ${this.weight}kg | Total Donations: ${this.donationHistory.length}`;
  }

  // Static Method: Get total registered donors
  static getTotalDonors() {
    return `Total registered donors: ${Donor.totalDonors}`;
  }
}

// ============= CLASS 2: BloodBank =============

class BloodBank {
  // Static property — tracks total blood units across all blood banks
  static totalUnitsCollected = 0;

  constructor(bankName, location) {
    this.bankName = bankName;
    this.location = location;
    this.donors = []; // array of Donor objects
    this.bloodInventory = {
      "A+": 0,
      "A-": 0,
      "B+": 0,
      "B-": 0,
      "AB+": 0,
      "AB-": 0,
      "O+": 0,
      "O-": 0,
    };
  }

  // Method 1: Register a new donor
  registerDonor(donor) {
    this.donors.push(donor);
    return `${donor.name} (${donor.bloodType}) has been registered at ${this.bankName}.`;
  }

  // Method 2: Process a donation from a registered donor
  processDonation(donor, date) {
    const eligibility = donor.isEligible();
    if (!eligibility.eligible) {
      return `Donation rejected for ${donor.name}: ${eligibility.reason}`;
    }

    donor.recordDonation(date);
    this.bloodInventory[donor.bloodType]++;
    BloodBank.totalUnitsCollected++;

    return `Donation processed: 1 unit of ${donor.bloodType} blood collected from ${donor.name} at ${this.bankName}.`;
  }

  // Method 3: Display blood inventory
  getInventoryReport() {
    let report = `\n===== Blood Inventory: ${this.bankName} (${this.location}) =====\n`;
    for (const [type, units] of Object.entries(this.bloodInventory)) {
      const bar = "█".repeat(units) || "—";
      report += `  ${type}: ${units} unit(s) ${bar}\n`;
    }
    report += `  Total units at this bank: ${Object.values(this.bloodInventory).reduce((a, b) => a + b, 0)}\n`;
    report += `================================================\n`;
    return report;
  }

  // Method 4: Find donors by blood type
  findDonorsByBloodType(bloodType) {
    const matches = this.donors.filter((d) => d.bloodType === bloodType);
    if (matches.length === 0) {
      return `No donors found with blood type ${bloodType} at ${this.bankName}.`;
    }
    let result = `Donors with blood type ${bloodType} at ${this.bankName}:\n`;
    matches.forEach((d) => {
      result += `  - ${d.getDonorSummary()}\n`;
    });
    return result;
  }

  // Static Method: Get total blood units collected across all banks
  static getTotalUnitsCollected() {
    return `Total blood units collected across all banks: ${BloodBank.totalUnitsCollected}`;
  }
}

// ===================== USAGE / DEMO SECTION =====================

console.log("============================================");
console.log("   BLOOD DONATION REGISTER — DEMO");
console.log("============================================\n");

// --- Step 1: Create a Blood Bank ---

const lagosBloodBank = new BloodBank(
  "Lagos Central Blood Bank",
  "Ikeja, Lagos",
);
console.log(
  `Blood Bank Created: ${lagosBloodBank.bankName} (${lagosBloodBank.location})\n`,
);

// --- Step 2: Create Donor Instances ---

const donor1 = new Donor("Taiwo Olusegun", 28, "O+", 75);
const donor2 = new Donor("Adebayo Musa", 35, "A+", 82);
const donor3 = new Donor("Chioma Eze", 22, "B+", 58);
const donor4 = new Donor("Fatima Bello", 16, "O-", 55); 
const donor5 = new Donor("Emeka Obi", 40, "O+", 45); 

console.log("--- Registered Donors ---");
console.log(donor1.getDonorSummary());
console.log(donor2.getDonorSummary());
console.log(donor3.getDonorSummary());
console.log(donor4.getDonorSummary());
console.log(donor5.getDonorSummary());
console.log("");

// --- Step 3: Register Donors at the Blood Bank ---

console.log("--- Registering Donors ---");
console.log(lagosBloodBank.registerDonor(donor1));
console.log(lagosBloodBank.registerDonor(donor2));
console.log(lagosBloodBank.registerDonor(donor3));
console.log(lagosBloodBank.registerDonor(donor4));
console.log(lagosBloodBank.registerDonor(donor5));
console.log("");

// --- Step 4: Check Eligibility ---

console.log("--- Eligibility Checks ---");
console.log(`${donor1.name}: ${donor1.isEligible().reason}`);
console.log(`${donor4.name}: ${donor4.isEligible().reason}`);
console.log(`${donor5.name}: ${donor5.isEligible().reason}`);
console.log("");

// --- Step 5: Process Donations ---

console.log("--- Processing Donations ---");
console.log(lagosBloodBank.processDonation(donor1, "2025-04-04"));
console.log(lagosBloodBank.processDonation(donor2, "2025-04-04"));
console.log(lagosBloodBank.processDonation(donor3, "2025-04-04"));
console.log(lagosBloodBank.processDonation(donor4, "2025-04-04")); 
console.log(lagosBloodBank.processDonation(donor5, "2025-04-04")); 
console.log("");

// --- Step 6: Try Duplicate Donation (should fail — 56-day rule) ---

console.log("--- Attempting Duplicate Donation ---");
console.log(lagosBloodBank.processDonation(donor1, "2025-04-05"));
console.log("");

// --- Step 7: Display Inventory ---

console.log(lagosBloodBank.getInventoryReport());

// --- Step 8: Find Donors by Blood Type ---

console.log(lagosBloodBank.findDonorsByBloodType("O+"));

// --- Step 9: Static Method Outputs ---

console.log("--- System Statistics ---");
console.log(Donor.getTotalDonors());
console.log(BloodBank.getTotalUnitsCollected());
