# 🛡️ CHECKPOINT: Arquitectura de Supervivencia y Transición
**Fecha/Hora:** 21 de Abril, 2026 - 21:23 (CET)  
**Estatus de Sistema:** INTEGRIDAD 100% (Funcional en Vercel)  
**ID de Punto de Control:** `SAFE_POINT_META_TRANSITION_01`

---

## 1. Mapa de Funcionamiento (Source of Truth)

### 🧠 Capa de Inteligencia (`src/lib/bot-logic.ts`)
- **Estado:** Calibrado con "Instinto Comercial V2.0".
- **Funciones:** Mirroring, Detección de Hemorragia de Ventas, Hand-off al Director.
- **Protocolo Personal:** Desactivación automática al detectar intención "Personal".

### 📞 Capa de Comunicación (`src/app/api/webhook/route.ts`)
- **Estado:** Híbrido (Resiliente).
- **Compatibilidad:** 
    - [x] Entrada Directa de Meta (Cloud API).
    - [x] Entrada vía Make (Legacy Support).
- **Performance:** Ejecuta respuesta inmediata `status: 200` para evitar bloqueos de Meta por latencia.

### 🗄️ Capa de Datos (Supabase)
- **Tabla `chats`:** Registro íntegro con metadatos estratégicos (`intent`, `topic`, `strategic_note`).
- **Tabla `bot_settings`:** Control de encendido/apagado por número de teléfono.
- **Seguridad:** RLS Activo para gestión administrativa de borrados.

---

## 2. Auditoría del Ecosistema Meta (Contexto Actual)
- **App ID:** `2758101607887987`
- **WABA ID:** `931321409327417`
- **Número:** `+34 611 49 96 74`
- **Estado en Meta:** "Fuera de Internet" (Pendiente de handshake directo).
- **Meta Business Manager:** Verificación en revisión (Iniciada por el usuario).

---

## 3. Parámetros de Configuración Requeridos (Bloqueadores)
Para que la App de Meta pase a estado "En Vivo" y acepte el Webhook directo, requiere los siguientes endpoints públicos en nuestro dominio:
1. `/privacy`: Política de Privacidad (Exigido por Meta).
2. `/terms`: Condiciones del Servicio (Exigido por Meta).
3. `/data-deletion`: Instrucciones de eliminación de datos (Exigido por Meta).

---

## 4. Próximos Pasos (Hoja de Ruta Inmediata)
1. **Fase de Cumplimiento:** Creación de páginas estáticas requeridas por Meta.
2. **Fase de Handshake:** Configuración de Webhook URL en el dashboard de Meta apuntando a Vercel.
3. **Fase de Coexistencia:** Implementación de Embedded Signup para recuperar el control sin perder la App móvil.

---
**Nota de Seguridad:** Este punto de control garantiza que tenemos un respaldo de la lógica operativa. En caso de error crítico en los próximos pasos, la instrucción es revertir a `src/app/api/webhook/route.ts` versión 21.04-21:10.
