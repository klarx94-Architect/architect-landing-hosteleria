# 📘 Resumen Ejecutivo Maestro: Architect.Sys (Backup Total)

**Fecha de Última Revisión:** 20/04/2026  
**Estatus:** Producción / Industrialización Completada  
**Propietario:** Architect.Sys Core

---

## 🚀 1. Visión y Objetivo
Architect.Sys es un ecosistema de ventas automatizado de alto rendimiento para hostelería. Transforma un simple chatbot de WhatsApp en un **Cerrador Senior** con memoria persistente, instinto de detección humana y una consola de mando de estética SaaS Premium (Clarity).

---

## 🏗️ 2. Arquitectura de Software (Stack Técnico)
- **Framework:** Next.js (App Router).
- **IA Engine:** Google Gemini 2.5 (Configurado como Sales Closer).
- **Base de Datos:** Supabase (PostgreSQL) con Realtime habilitado.
- **Canal de Comunicación:** Meta Cloud API (WhatsApp Business).
- **Despliegue:** Vercel (Protocolo GitOps via GitHub Master).

### Mapa del Repositorio:
- `/src/app/api/webhook/route.ts`: Orquestador de entrada (Meta -> Supabase -> IA).
- `/src/lib/bot-logic.ts`: Cerebro analítico, psicología de ventas y memoria.
- `/src/lib/meta-api.ts`: Motor de despacho de mensajes hacia WhatsApp.
- `/src/app/admin-architect/page.tsx`: Consola de Mando (Sala de Análisis).
- `/src/app/onboarding/page.tsx`: Centro de Operaciones Espaciales (Configuración).

---

## 🗄️ 3. Infraestructura de Datos (Supabase)
### Esquema Auditado (`public.chats`):
- `id` (uuid, PK): Identificador único.
- `phone` (text): Número del cliente.
- `role` (user/assistant): Identifica quién envió el mensaje.
- `content` (text): El mensaje íntegro.
- `intent` (venta/lead/rechazo): Intención detectada.
- `topic`: Categoría de consulta (Precio, ROI, Reserva, Personal).
- `closing_stage`: Fase del embudo (Atención, Interés, Deseo, Acción).
- `strategic_note`: Nota mental de la IA sobre su decisión comercial.
- `owner_id` (uuid): Soporte multi-tenencia (Triggers activos).

### Políticas RLS:
- **Public Full Access:** Habilitada para usuarios autenticados para garantizar el flujo Vercel-Supabase.
- **Tenencia:** Existe protección de `owner_id` para aislar datos por usuario administrativo.

---

## 🤖 4. Inteligencia Artificial (The Closer)
El bot opera bajo una personalidad de **Consultor Senior con Autoridad Quirúrgica**.

### Protocolo de Detección Humana:
Si la IA detecta que la conversación es **Personal** (amigos, familia, spam), lanza un mensaje de cortesía humana y se pausa, dejando el control a la intervención manual para evitar intrusismo.

### Memoria Persistente:
El sistema consulta los últimos **10 mensajes** de Supabase antes de cada respuesta, permitiendo que la IA mantenga el hilo conductor y detecte contradicciones u oportunidades de cierre.

---

## 🔐 5. Protocolos de Operación y Seguridad
### Protocolo Anti-Monolito:
Ningún archivo de lógica debe superar las **300 líneas**. Si crece, debe fragmentarse en componentes o utilidades en `/src/lib`.

### Protocolo Cloud-Exclusive:
El repositorio en GitHub es la **Fuente de Verdad**. Cualquier cambio debe ser sincronizado vía `git push` para que cristalice en la producción de Vercel.

### Protocolo de Seguridad Local:
- **Prohibición de Navegadores Externos:** No se deben usar agentes de navegación para no colapsar los recursos locales.
- **Optimización de Recursos:** Todo trabajo local es ligero y enfocado a la edición de archivos.

---

## 🛠️ 6. Variables de Entorno (Requeridas)
Para reconstruir el entorno, se necesitan estas llaves en el `.env.local` de Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`: Endpoint de base de datos.
- `SUPABASE_SERVICE_KEY`: Acceso total para el backend.
- `GEMINI_API_KEY`: Motor de inteligencia.
- `WHATSAPP_TOKEN`: Autenticación con Meta Cloud.
- `WHATSAPP_PHONE_NUMBER_ID`: Identificador del nodo de envío.
- `WHATSAPP_VERIFY_TOKEN`: Token para el handshake de Webhook.

---

## 🏁 7. Guía de Recuperación Rápida
1. Agrega el Webhook URL en el panel de Meta (`/api/webhook`).
2. Ejecuta el DDL de `SUPABASE_BLUEPRINT.md` en el SQL Editor de Supabase.
3. Sincroniza las variables de entorno en Vercel.
4. El sistema estará operativo en < 5 minutos.

---
**Generado por:** Agente Antigravity  
*Documento de herencia técnica para el éxito comercial de Architect.Sys.*
