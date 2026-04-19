'use client';
import { useEffect, useState } from 'react';

/**
 * Architect Sys - Portal de Onboarding Profesional
 * Este portal permite la vinculación de WhatsApp en modo coexistencia (App + API).
 */
export default function OnboardingPage() {
  const appId = '1372636351293269';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicialización del SDK de Facebook
    (window as any).fbAsyncInit = function() {
      (window as any).FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
      setLoading(false);
    };

    // Carga dinámica del script del SDK
    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/es_ES/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

  const launchWhatsAppSignup = () => {
    if (!(window as any).FB) return alert('El SDK de Facebook no ha cargado aún.');

    (window as any).FB.login((response: any) => {
      if (response.authResponse) {
        // En un flujo real, aquí llamaríamos a una API para guardar el token
        console.log('Respuesta de Autenticación:', response);
        alert('¡Vinculación completada con éxito! Ahora puedes cerrar esta ventana y revisar tu panel de WhatsApp Manager para ver el Phone ID.');
      } else {
        alert('Se canceló el proceso o hubo un error en la autenticación.');
      }
    }, {
      // Permisos necesarios para gestionar WhatsApp y enviar mensajes
      scope: 'whatsapp_business_management,whatsapp_business_messaging',
      // Configuración de Embedded Signup para coexistencia
      extras: {
        feature: 'whatsapp_embedded_signup',
        setup: {
          // Meta detectará automáticamente el estado del número en la App Business
        }
      }
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        maxWidth: '500px'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#38bdf8' }}>
          Architect Sys
        </h1>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
          Portal de Vinculación Real
        </h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem' }}>
          Este proceso vinculará tu número <strong>{`+34 611 49 96 74`}</strong> con la plataforma de IA 
          preservando tu aplicación móvil (Modo Coexistencia).
        </p>

        <button
          onClick={launchWhatsAppSignup}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#475569' : '#2563eb',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '9999px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
          }}
          onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          {loading ? 'Cargando Motor Meta...' : 'Vincular WhatsApp Real'}
        </button>

        <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#64748b' }}>
          App ID Detectado: <code style={{ color: '#cbd5e1' }}>{appId}</code>
        </div>
      </div>
    </div>
  );
}
