"use client";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";


const firebaseConfig = {
    apiKey: "AIzaSyDYTO_r-5gbFgqDM7a5ykBtvgaMRa01ssU",
    authDomain: "tradesync-7507f.firebaseapp.com",
    projectId: "tradesync-7507f",
    storageBucket: "tradesync-7507f.appspot.com",
    messagingSenderId: "629393996092",
    appId: "1:629393996092:web:33b397a33ab549e0c98639",
    measurementId: "G-ER6THB3C4L"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const ImageUploader = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0); // State variable for user's balance
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const saveUserDataToFirestore = async (user) => {
          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
              await setDoc(docRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                balance: 0,
              });
              console.log("User data successfully stored in Firestore!");
            } else {
              console.log("User already exists in Firestore!");
            }
          } catch (error) {
            console.error("Error storing user data: ", error);
          }
        };
        saveUserDataToFirestore(user);

        // Fetch user's balance from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setBalance(userData.balance || 0);
        }
      } else {
        setUser(null);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddMoney = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentBalance = userData.balance || 0;
        const newBalance = currentBalance + parseFloat(amountToAdd);
        await updateDoc(userDocRef, { balance: newBalance });
        console.log("Money added successfully!");
        setShowModal(false);
        setBalance(newBalance); // Update balance in state after adding money
      }
    } catch (error) {
      console.error("Error adding money:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray(".ball");
    window.addEventListener("mouseleave", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 0,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mouseenter", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        scale: 1,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
    window.addEventListener("mousemove", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
  }, []);

  return (
    <>
      <div className="ball blur-3xl bg-purple-400/50 w-96 h-96 fixed top-0 left-0 rounded-full"></div>
      <button onClick={() => setShowModal(true)}>Add Money to Wallet</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add Money to Wallet</h2>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
            />
            <button onClick={handleAddMoney} disabled={loading}>
              {loading ? "Adding..." : "Confirm"}
            </button>
          </div>
        </div>
      )}
      <div className="bottom-navigation bottom-0 fixed w-full p-4 md:hidden bg-gradient-to-b from-white to-transparent backdrop-blur-md shadow-2xl h-fit">
        <div className="flex items-center justify-around md:hidden">
          <div className="flex flex-col items-center">
            <a href="/foodsnap">
              <img
                src="/food.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-40`}
              />
              <div className="text-xs text-center">Food</div>
            </a>
          </div>
          <div className="flex flex-col items-center">
            <a href="/skinsnap">
              <img
                src="/face.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-40 hover:opacity-100`}
              />
              <div className="text-xs text-center">Skin</div>
            </a>
          </div>
          <div className="flex flex-col items-center">
            <a href="/bodysnap">
              <img
                src="/body.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-100 active:opacity-100`}
              />
              <div className="text-xs text-center">Wallet</div>
            </a>
          </div>
          <div className="flex flex-col items-center">
            <a href="/scoreboard">
              <img
                src="/nutricon.png"
                alt=""
                height={30}
                width={30}
                className={` mx-auto opacity-40`}
              />
              <div className="text-xs text-center">Scoreboard</div>
            </a>
          </div>
        </div>
      </div>
      {/* Display user's balance */}
      <div>Balance: {balance}</div>
    </>
  );
};

export default ImageUploader;
