# 🗄️ Blueprint de Infraestructura (Bare Metal) - Supabase (AUDITADO)

## 1. Objetivo y Contexto
Este script refleja la infraestructura REAL auditada el 20/04/2026. Soporta el flujo de Architect.Sys con capacidades de multi-tenencia mediante `owner_id`.

## 2. DDL Actual (Fuente de Verdad)

```sql
-- TABLA PRINCIPAL: chats
CREATE TABLE IF NOT EXISTS public.chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    intent TEXT DEFAULT 'lead' CHECK (intent = ANY (ARRAY['venta','lead','rechazo'])),
    sentiment TEXT DEFAULT 'neutro' CHECK (sentiment = ANY (ARRAY['positivo','negativo','neutro'])),
    owner_id UUID, -- Gestionado por set_chats_owner_id()
    topic TEXT DEFAULT 'Otro',
    closing_stage TEXT DEFAULT 'atencion',
    strategic_note TEXT,
    status TEXT DEFAULT 'active'
);

-- TABLA CONFIGURACIÓN: bot_settings
CREATE TABLE IF NOT EXISTS public.bot_settings (
    phone TEXT PRIMARY KEY,
    enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de Rendimiento
CREATE INDEX IF NOT EXISTS idx_chats_phone ON public.chats(phone);
CREATE INDEX IF NOT EXISTS idx_chats_created_at ON public.chats(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chats_owner_id ON public.chats(owner_id);
```

## 3. Seguridad RLS Auditada
- **chats**: Políticas activas para acceso autenticado y filtrado por `owner_id`.
- **bot_settings**: Acceso total para usuarios autenticados.

## 4. Próxima Evolución (Pendiente de Aprobación)
Añadir columnas de inteligencia estratégica:
- `topic`: Categoría de consulta (Precio, Reserva, ROI, etc).
- `closing_stage`: Fase del embudo (Atención, Interés, Deseo, Acción).
- `strategic_note`: Justificación conductual de la IA.
