export default function ResumenAcopios({ acopios }) {
    
    // Agrupamos y sumamos los kilos por material
    const totales = acopios.reduce((acumulador, acopio) => {
        const material = acopio.material;
        const peso = parseFloat(acopio.peso_kg);

        if (!acumulador[material]) {
            acumulador[material] = 0;
        }
        
        acumulador[material] += peso;
        return acumulador;
    }, {});

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Resumen de Materiales</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Botellas PET */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">PET</p>
                    <p className="text-3xl font-bold text-blue-900">
                        {totales['PET'] ? totales['PET'].toFixed(2) : '0.00'} <span className="text-lg font-medium">kg</span>
                    </p>
                </div>

                {/* Cartón Corrugado */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-yellow-600 font-semibold uppercase tracking-wide">Cartón</p>
                    <p className="text-3xl font-bold text-yellow-900">
                        {totales['Cartón'] ? totales['Cartón'].toFixed(2) : '0.00'} <span className="text-lg font-medium">kg</span>
                    </p>
                </div>

                {/* Plástico PEAD */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-600 font-semibold uppercase tracking-wide">PEAD</p>
                    <p className="text-3xl font-bold text-green-900">
                        {totales['PEAD'] ? totales['PEAD'].toFixed(2) : '0.00'} <span className="text-lg font-medium">kg</span>
                    </p>
                </div>
            </div>
        </div>
    );
}