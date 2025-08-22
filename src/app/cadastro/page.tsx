"use client";

import { useState } from "react";

export default function cadastroPage(){
    const[tipo, setTipo] = useState("Gestor"); // o padrão vai ser Gestor
    const[nome, setNome] = useState("");
    const[cpf, setCpf] = useState("");
    const[tel, setTel] = useState("");
    const[email, setEmail] = useState("");
    const[senha, setSenha] = useState("");
    const handlecadastro = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`
            Nome: ${nome}, 
            Cpf: ${cpf}, 
            Email: ${email}, 
            Tel: ${tel}, 
            Senha: ${senha}`
        );
    };
    return ( 
    <div style={{ maxWidth:"400px", margin: "400px auto", textAlign:"center"}}>
        <h1 style={{margin:"10px auto", textAlign:"center", fontSize:"50px", color:"black"}}>Cadastro de {tipo}</h1>
        <form onSubmit={handlecadastro} style={{ display:"flex",flexDirection:"column", gap:"10px"}}>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Gestor">Gestor</option>
                <option value="Morador">Morador</option>
            </select>

            <input type="text"
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required 
            style={{padding:"8px"}}/>

            <input type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{padding:"8px"}}/>

            <input type="password" 
            placeholder="Senha (mín. 8 caracteres, 1 maiúscula, 1 minúscula e 1 símbolo)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            minLength={8}
            maxLength={16}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$"
            title="A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula e 1 símbolo."
            required/>

            <input type="text" 
            placeholder="CPF"
            title="Digite exatamente 11 números do seu CPF"
            value={cpf}
            onChange={(e) => {const onlyNums = e.target.value.replace(/[^0-9]/g, "")
             setCpf(onlyNums);
            }}
            pattern="^[0-9]{11}$"
            maxLength={11}
            required/>

            <input type="tel" 
            placeholder="Telefone"
            value={tel}
            maxLength={9}
            max={9}
            onChange={(e) => setTel(e.target.value)}
            required/>
            <button type="submit" className="entrarbtn">Enviar</button >
        </form>
    </div> 
        )
    }