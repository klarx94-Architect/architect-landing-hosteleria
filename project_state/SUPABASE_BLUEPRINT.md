# 🗄️ Blueprint de Infraestructura (Bare Metal) - Supabase

## 1. Objetivo y Contexto
Este script levanta la infraestructura de datos desde cero, estableciendo la tabla `chats` con el esquema necesario para soportar el flujo del Webhook y la extracción analítica (intent y sentiment) del Dashboard de la Fase 3.

## 2. Instrucciones de Despliegue SQL
Copia y pega el siguiente código en el **SQL Editor** de tu panel de Supabase y presiona "Run".

```sql
-- Habilitar extensión para generación de UUIDs si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creación de la tabla principal de operaciones AI
CREATE TABLE IF NOT EXISTS public.chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    phone TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    intent TEXT DEFAULT 'lead' CHECK (intent IN ('venta', 'lead', 'rechazo')),
    sentiment TEXT DEFAULT 'neutro' CHECK (sentiment IN ('positivo', 'negativo', 'neutro'))
);

-- Índices de Rendimiento para la Sala de Análisis (Dashboard)
-- Optimiza la búsqueda de métricas por número de teléfono y fecha
CREATE INDEX IF NOT EXISTS idx_chats_phone ON public.chats(phone);
CREATE INDEX IF NOT EXISTS idx_chats_created_at ON public.chats(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chats_intent ON public.chats(intent);

-- Configuración de Seguridad de Nivel de Fila (RLS)
-- Como las solicitudes provienen nativamente desde Vercel (servidor cerrado con Service Key/Anon Key),
-- habilitamos RLS y creamos una política permisiva para el Service Role.
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Política: Permitir todo el acceso mediante Service Role o Anon (Ajustable a futuro)
CREATE POLICY "Enable all for authenticated service key" 
ON public.chats FOR ALL 
USING (true) WITH CHECK (true);
```

## 3. Configuración de Variables (Vercel)
Una vez creado el proyecto en Supabase:
1. Ve a **Project Settings -> API**.
2. Copia la **Project URL**.
3. Copia la **Project API Key (anon/public)** y la **Service Role Key** (si la requieres, aunque el SDK maneja la anon por defecto en edge).
4. Dirígete al panel de tu proyecto en **Vercel -> Settings -> Environment Variables**.
5. Añade/Actualiza:
   - `NEXT_PUBLIC_SUPABASE_URL` = [Tu Project URL]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [Tu Anon Key]
6. Guarda y realiza un Redeploy en Vercel si es necesario para inyectar el nuevo entorno.

## 4. Estado de Preparación para CLI
Una vez finalizada esta operación, el sistema de Webhook generará entradas con metadatos y el Dashboard (cuyo código ya está cableado y fue desplegado preventivamente a GitHub mediante el commit de la Fase 3) materializará la lectura de `intent` y `sentiment`.
