const steps = [
  {
    num: '01',
    title: 'Definí tu presupuesto real',
    color: '#0c447c',
    bg: '#e6f1fb',
    tips: [
      'Incluí el costo de seguro, patente y VTV en tu presupuesto total, no solo el precio de compra.',
      'Reservá al menos un 10 % del valor del auto para reparaciones y mantenimiento del primer año.',
      'Si financiás, calculá que la cuota no supere el 20–25 % de tu ingreso mensual neto.',
      'Comparar el costo de mantenimiento entre marcas puede ahorrarte miles de pesos al año.',
    ],
  },
  {
    num: '02',
    title: 'Elegí el tipo de auto según tu uso',
    color: '#27500a',
    bg: '#eaf3de',
    tips: [
      'Para uso urbano diario priorizá un motor nafta de 1.4–1.6 L: menor consumo y mantenimiento más económico.',
      'Si hacés rutas largas frecuentes, el diesel compensa su mayor precio inicial en pocos meses.',
      'Las SUV y 4x4 tienen mayor consumo urbano; evaluá si realmente necesitás tracción total.',
      'Camionetas: ideales para carga y off-road, pero costosas en ciudad (combustible y estacionamiento).',
    ],
  },
  {
    num: '03',
    title: 'Nuevo vs. usado: pros y contras',
    color: '#633806',
    bg: '#faeeda',
    tips: [
      'Un auto nuevo 0 km pierde entre el 15 y el 20 % de su valor al salir de la concesionaria.',
      'Un usado con 2–4 años y buen historial de mantenimiento suele ser la mejor relación precio/valor.',
      'Desconfiá de precios muy por debajo del mercado: siempre tiene una razón.',
      'Verificá si el auto tiene siniestros declarados en el Registro Nacional de Antecedentes del Tránsito (RENAT).',
    ],
  },
  {
    num: '04',
    title: 'Inspección técnica antes de comprar',
    color: '#444441',
    bg: '#f1efe8',
    tips: [
      'Llevá el auto a un mecánico de confianza para una revisión completa antes de cerrar la operación.',
      'Revisá el estado del motor en frío: humo blanco puede indicar fuga de refrigerante; negro, problema de inyección.',
      'Examiná carrocería con luz rasante para detectar masilla o reparaciones no declaradas.',
      'Probá todos los sistemas eléctricos: luces, vidrios, aire acondicionado, cierre centralizado.',
      'Verificá el kilometraje con los servicios en el libro de mantenimiento y la desgaste de pedales/volante.',
    ],
  },
  {
    num: '05',
    title: 'Documentación y transferencia',
    color: '#3c3489',
    bg: '#eeedfe',
    tips: [
      'Verificá que el título del dominio (cédula verde) esté a nombre del vendedor y no tenga inhibiciones.',
      'Consultá en el Registro de la Propiedad Automotor si el vehículo tiene prendas o embargos.',
      'La transferencia debe realizarse ante escribano o en el Registro Automotor; nunca solo con boleto privado.',
      'Pedí el informe de dominio 08 actualizado (no mayor a 15 días) antes de firmar.',
    ],
  },
  {
    num: '06',
    title: 'Financiamiento: qué mirar',
    color: '#7a0c0c',
    bg: '#fdeaea',
    tips: [
      'Comparar el TNA (Tasa Nominal Anual) no es suficiente: pedí el CFT (Costo Financiero Total), que incluye todos los gastos.',
      'Los créditos prendarios de bancos suelen tener mejor tasa que los planes de la concesionaria.',
      'El seguro de vida obligatorio sobre el crédito es un gasto adicional que encarece la cuota.',
      'Si podés pagar más de un 30 % de contado, negociá una tasa preferencial o descuento por pago anticipado.',
    ],
  },
];

const checklist = [
  'Cédula verde a nombre del vendedor',
  'Sin prendas ni inhibiciones (informe 08)',
  'VTV y patentes al día',
  'Revisión mecánica independiente realizada',
  'Kilometraje verificado con libreta de servicio',
  'Prueba de manejo en distintas condiciones',
  'Seguro cotizado antes de cerrar la compra',
  'Precio acordado por escrito antes de la transferencia',
];

export function GuiaDeCompra({ onBack }) {
  return (
    <div className="flex flex-col gap-5">

      <button
        onClick={onBack}
        className="self-start px-4 py-2 bg-white border border-[#e2e2e2] rounded-[10px] text-[13px] text-[#1a1a1a] hover:border-[#e63946] transition-colors"
      >
        ← Volver al catálogo
      </button>

      {/* Hero */}
      <div className="bg-[#111111] rounded-[16px] px-8 py-7 flex flex-col gap-2">
        <span className="text-[#e63946] text-[11px] uppercase tracking-[2px] font-medium">
          Info útil
        </span>
        <h1 className="text-white text-[22px] font-semibold leading-snug">
          Guía de compra de autos
        </h1>
        <p className="text-[#888] text-[13px] leading-relaxed max-w-[560px]">
          Todo lo que tenés que saber antes de comprar tu próximo vehículo, desde el
          presupuesto hasta la firma del contrato.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white border border-[#e2e2e2] rounded-[12px] overflow-hidden"
          >
            {/* Step header */}
            <div
              className="flex items-center gap-3 px-5 py-3.5 border-b border-[#e2e2e2]"
              style={{ backgroundColor: step.bg }}
            >
              <span
                className="text-[11px] font-bold tracking-wider font-mono"
                style={{ color: step.color }}
              >
                {step.num}
              </span>
              <h2
                className="text-[13px] font-semibold"
                style={{ color: step.color }}
              >
                {step.title}
              </h2>
            </div>

            {/* Tips */}
            <ul className="px-5 py-4 flex flex-col gap-2.5">
              {step.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-[#5a5a5a] leading-relaxed">
                  <span
                    className="mt-[3px] w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    ✓
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Checklist del comprador */}
      <div className="bg-white border border-[#e2e2e2] rounded-[12px] overflow-hidden">
        <div className="bg-[#111111] px-5 py-3 flex items-center gap-3">
          <span className="text-[#e63946] text-[16px]">☑</span>
          <span className="text-white text-[13px] font-semibold tracking-wide">
            Checklist del comprador
          </span>
          <span className="ml-auto text-[#555] text-[11px]">
            Antes de cerrar la operación
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-[#f0f0f0] sm:divide-y-0">
          {checklist.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 border-b border-[#f0f0f0] last:border-b-0"
            >
              <span className="w-5 h-5 rounded border-2 border-[#e2e2e2] flex-shrink-0" />
              <span className="text-[13px] text-[#1a1a1a]">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
