# Estado Actual del Proyecto: Hospitality Landing (Architect.Sys)

**Última Actualización**: 2026-04-17
**Rol Responsable**: Senior Full-Stack Architect

## 🔍 Auditoría Forense (Sincronización)
- **Estado de Precios**: ✅ **ALINEADO**. El código en el repositorio de GitHub refleja los precios actualizados: **250€** (Carta Interactiva) y **650€** (Recepcionista 24/7).
- **Último Commit Auditado**: `f49b2f5` - *Refactor: Implement Senior Architect protocol and update commercial pricing (250e/650e)*.
- **Vercel Sync**: El despliegue en producción está sincronizado con la rama `main` de GitHub.

## 📜 Cumplimiento de Protocolos Inamovibles
1.  **Nube Exclusiva**: ✅ TODO cambio se realiza mediante `git push`. Sin despliegues locales.
2.  **Anti-Monolito**: ✅ Ningún archivo supera las 300 líneas (ideal 200). Lógica fragmentada en `src/lib/`.
3.  **Aislamiento**: ✅ Operaciones limitadas estrictamente a este repositorio.
4.  **Eficiencia Webhook**: ✅ El orquestador responde `200 OK` de inmediato; procesamiento Gemini en background.
5.  **Trazabilidad**: ✅ Carpeta `/project_state/` creada y activa.

## 🚀 Implementaciones Fase 1 (Sincronización)
- [x] **UI & Copy**: Actualización de precios y textos con tono de venta agresivo B2B.
- [x] **Backend Modular**: Creación de `src/lib/bot-logic.ts` y `src/lib/meta-api.ts`.
- [x] **Webhook Orchestration**: Refactorización de `src/app/api/webhook/route.ts`.

## 🔧 Corrección de Estabilidad (Build Vercel)
- **Error Auditado**: `Error: supabaseUrl is required.` (Fase de recolección de datos Next.js).
- **Diagnóstico**: Next.js intentaba pre-renderizar el webhook estáticamente, disparando la validación del SDK de Supabase antes de tener las variables de entorno cargadas.
- **Acciones Realizadas**:
    1.  **Supabase Resiliente**: Modificado `src/lib/supabase.ts` para evitar el crash si faltan las claves (modo Build).
    2.  **Ruta Dinámica**: Añadido `force-dynamic` a `src/app/api/webhook/route.ts` para saltar el análisis estático.

## 📌 Enlaces del Proyecto
- **Live URL**: https://architect-landing-hosteleria.vercel.app/
- **GitHub**: https://github.com/klarx94-Architect/architect-landing-hosteleria
