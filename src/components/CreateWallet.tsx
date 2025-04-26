import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function CreateWallet() {
  const session = useSession();
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    if (!session?.data?.user?.email) return;
    const handleCreateWallet = async () => {
      setIsCreating(true);
      try {
        const response = await fetch("/api/createWallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.data?.user?.email,
          }),
        });
        const data = await response.json();
        console.log("Wallet created successfully:", data);
      } catch (error) {
        console.error("Error creating wallet:", error);
      } finally {
        setIsCreating(false);
      }
    };
    handleCreateWallet();
  }, [session]);
  return <div></div>;
}
