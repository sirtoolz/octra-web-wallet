// Wallet functions - all operations happen in browser
class OctraWallet {
  static generateWallet() {
    // In real implementation: Use WebAssembly crypto functions
    const testPrivateKey = "base64-test-key-" + Math.random().toString(36).slice(2);
    const testAddress = "octra_addr_" + Math.random().toString(36).slice(2, 10);
    return { privateKey: testPrivateKey, address: testAddress };
  }

  static signTransaction(privateKey, txData) {
    // In real implementation: Sign with WASM module
    console.log("Signing with key:", privateKey.slice(0, 12) + "...");
    return "signed_tx_" + Math.random().toString(36).slice(2);
  }
}

// UI Event Handlers
document.getElementById("createWallet").addEventListener("click", () => {
  const wallet = OctraWallet.generateWallet();
  document.getElementById("newWallet").innerHTML = `
    <p><strong>SAVE THIS PRIVATE KEY:</strong> ${wallet.privateKey}</p>
    <p><strong>Your Address:</strong> ${wallet.address}</p>
    <p style="color:red">Never share your private key!</p>
  `;
});

document.getElementById("sendTx").addEventListener("click", () => {
  const privateKey = document.getElementById("privateKey").value;
  const receiver = document.getElementById("receiver").value;
  const amount = document.getElementById("amount").value;
  
  if (!privateKey || !receiver || !amount) {
    alert("Please fill all fields");
    return;
  }
  
  // For demo: In real app, use WASM for signing
  const signedTx = OctraWallet.signTransaction(privateKey, {
    to: receiver,
    amount: amount
  });
  
  // Simulate transaction broadcast
  document.getElementById("txStatus").innerText = "Transaction sent! TX ID: " + 
    Math.random().toString(36).slice(2, 12).toUpperCase();
});

document.getElementById("viewHistory").addEventListener("click", () => {
  const address = document.getElementById("address").value;
  if (!address) return;
  
  // Demo history - real implementation would fetch from blockchain
  document.getElementById("history").innerHTML = `
    <p>Latest transactions for ${address.slice(0, 12)}...</p>
    <ul>
      <li>TX 1: Sent 10 OCTRA - Confirmed</li>
      <li>TX 2: Received 5 OCTRA - Confirmed</li>
    </ul>
  `;
});
