const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// ➡️ Add user to Firestore on signup/login
exports.addUserToFirestore = functions.auth.user().onCreate((user) => {
  const { uid, email, displayName, photoURL, providerData } = user;

  // Identify provider type (GitHub or Email/Password)
  const provider = providerData[0].providerId;

  return db
    .collection("users")
    .doc(uid)
    .set({
      email,
      displayName: displayName || "Anonymous",
      photoURL: photoURL || "",
      provider: provider === "github.com" ? "GitHub" : "Email/Password",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`User ${displayName || email} added to Firestore.`);
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
});

// ➡️ Optional: API to fetch user data from Firestore
exports.getUserData = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid;

  if (!uid) {
    res.status(400).send("User ID is required");
    return;
  }

  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      res.status(404).send("User not found.");
    } else {
      res.status(200).json(userDoc.data());
    }
  } catch (error) {
    res.status(500).send("Error fetching user data:", error);
  }
});
