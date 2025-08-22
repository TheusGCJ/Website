"use client";


import { useState} from "react";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e: React.FormEvent) =>{
        e.preventDefault();
        // Aqui você pode chamar a API para autenticar o usuário
        if (email === "admin@gmail.com" && senha === "12345An@") {
            alert("Login realizado com sucesso");
        } else {
            alert("Email ou senha inválidos");
        }
    };

    return (
        <div style={{ maxWidth:"400px", margin: "400px auto", textAlign:"center"}}>
        <h1 style={{margin:"5px auto", textAlign:"center", fontSize:"50px", color:"black"}}>LOGIN</h1>
        <form onSubmit={handleLogin} style={{display: "flex", flexDirection:"column", gap: "10px"}}>
            <input type="email" placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required/>
        
            <input type="password" 
            placeholder="Senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}  minLength={8} maxLength={16} required/>

            <button type="submit" className="entrarbtn">
            Entrar  
                 </button>
             </form>
                <p className="link">
                    Não tem uma conta? <a href="/cadastro" target="_blank" className="cadastro">Cadastra-se</a>
                </p> 
        </div>
    );
}
