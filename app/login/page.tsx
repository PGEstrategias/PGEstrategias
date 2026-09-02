'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass }),
      });
      const data = await res.json();
      if (data.ok) {
        const next =
          new URLSearchParams(window.location.search).get('next') || '/enviar';
        window.location.href = next;
      } else {
        setError(data.error || 'No se pudo iniciar sesión.');
        setPass('');
      }
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#141312',
        color: '#F5F2EF',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          maxWidth: 360,
          background: '#1E1B1A',
          border: '1px solid #35322E',
          borderRadius: 14,
          padding: 28,
        }}
      >
        <h1 style={{ fontSize: 20, margin: '0 0 6px' }}>
          <span style={{ color: '#D63A27' }}>◆</span> pg estrategias
        </h1>
        <p style={{ color: '#A9A5A0', fontSize: 13, margin: '0 0 22px' }}>
          Panel de envío · inicia sesión
        </p>

        <label style={lbl}>Usuario</label>
        <input
          style={inp}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          autoComplete="username"
          autoFocus
        />

        <label style={{ ...lbl, marginTop: 14 }}>Contraseña</label>
        <input
          style={inp}
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <div
            style={{
              marginTop: 14,
              padding: '10px 12px',
              borderRadius: 8,
              fontSize: 13,
              background: '#3a1512',
              border: '1px solid #D63A27',
              color: '#f0a89c',
            }}
          >
            ✖ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={cargando}
          style={{
            width: '100%',
            marginTop: 20,
            background: '#D63A27',
            color: '#fff',
            border: 0,
            borderRadius: 999,
            padding: '12px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            opacity: cargando ? 0.6 : 1,
          }}
        >
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}

const lbl: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: '#A9A5A0',
  marginBottom: 5,
};

const inp: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: '#141312',
  border: '1px solid #35322E',
  borderRadius: 8,
  color: '#F5F2EF',
  padding: '10px 12px',
  fontSize: 14,
};
