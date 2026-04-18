const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function testBrain(modelName) {
    console.log(`\n--- Probando Modelo: ${modelName} ---`);
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'tu_clave_aqui') {
        console.log('❌ ERROR: No se encontró la GEMINI_API_KEY en el entorno.');
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'Responde solo con la palabra: FUNCIONANDO' }] }],
                generationConfig: { responseMimeType: 'text/plain' }
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log(`✅ EXITO: ${data.candidates?.[0]?.content?.parts?.[0]?.text}`);
        } else {
            console.log(`❌ ERROR ${response.status}: ${JSON.stringify(data.error)}`);
        }
    } catch (err) {
        console.log(`🔴 FALLO DE CONEXION: ${err.message}`);
    }
}

async function run() {
    console.log('🧪 INICIANDO SONDA DE DIAGNÓSTICO INTERNO...');
    await testBrain('gemini-2.5-flash');
    await testBrain('gemini-3-flash');
}

run();
