import Login from './components/Login';
import { useState } from 'react';
import Formulario from "./components/formulario";
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FilterBar } from './components/FilterBar';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetail } from './components/VehicleDetail';
import { Nosotros } from './components/Nosotros';
import { Contacto } from './components/Contacto';
import { GuiaDeCompra } from './components/GuiaDeCompra';
import { VehicleComparator } from './components/VehicleComparator';
import { ComparadorPage } from './components/ComparadorPage';

const vehicles = [
  // ── 4x4 / SUV ───────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Mitsubishi Nativa 2.8',
    subtitle: '4x4 · Diesel · 2008',
    category: '4x4 / SUV',
    tags: ['Off-road', 'Familia', 'Ruta'],
    fit: 80,
    description: 'SUV robusta ideal para terrenos difíciles y viajes largos en familia. Motor diesel confiable con excelente torque y consumo moderado.',
    ventajas: [
      'Excelente capacidad off-road',
      'Interior espacioso para 7 pasajeros',
      'Bajo consumo en ruta',
      'Mecánica simple y económica'
    ],
    desventajas: [
      'Consumo urbano elevado',
      'Tecnología interior básica',
      'Reventa moderada'
    ],
    datosTecnicos: [
      'Motor: 2.8L Turbo Diesel',
      'Potencia: 163 HP',
      'Tracción: 4x4 permanente',
      'Consumo: 8.5L/100km'
    ]
  },
  {
    id: 2,
    name: 'Toyota Prado GX-r',
    subtitle: '4x4 · Diesel · 2007',
    category: '4x4 / SUV',
    tags: ['Off-road', 'Familia'],
    fit: 87,
    description: 'SUV premium con destacada capacidad todoterreno y confort superior. Reconocida por su durabilidad y valor de reventa.',
    ventajas: [
      'Fiabilidad legendaria',
      'Excelente reventa',
      'Capacidad off-road superior',
      'Confort en viajes largos'
    ],
    desventajas: [
      'Precio de mantenimiento alto',
      'Consumo urbano elevado',
      'Tamaño dificulta estacionamiento'
    ],
    datosTecnicos: [
      'Motor: 3.0L Turbo Diesel',
      'Potencia: 173 HP',
      'Tracción: 4x4 con reductora',
      'Consumo: 9.2L/100km'
    ]
  },
  {
    id: 3,
    name: 'Toyota Prado Sahara TX',
    subtitle: '4x4 · Diesel · 2010',
    category: '4x4 / SUV',
    tags: ['Ciudad', 'Ruta', 'Familia'],
    fit: 92,
    description: 'Versión tope de gama con máximo equipamiento. Combina lujo, tecnología y capacidad todoterreno en un paquete completo.',
    ventajas: [
      'Equipamiento completo de serie',
      'Motor potente y eficiente',
      'Interior premium',
      'Tecnología de seguridad avanzada'
    ],
    desventajas: [
      'Precio inicial elevado',
      'Costo de repuestos alto',
      'Consumo urbano moderado-alto'
    ],
    datosTecnicos: [
      'Motor: 3.0L D-4D Turbo',
      'Potencia: 190 HP',
      'Tracción: 4x4 con reductora',
      'Consumo: 8.8L/100km'
    ]
  },
  {
    id: 7,
    name: 'Nissan Pathfinder 3.5 V6',
    subtitle: '4x4 · Nafta · 2011',
    category: '4x4 / SUV',
    tags: ['Familia', 'Ruta', 'Off-road'],
    fit: 78,
    description: 'SUV de 7 pasajeros con tracción 4WD inteligente y motor V6 suave. Equilibrio entre confort familiar y capacidad todoterreno moderada.',
    ventajas: [
      'Capacidad para 7 pasajeros',
      'Motor V6 suave y potente',
      'Altura libre generosa',
      'Sistema multimedia completo'
    ],
    desventajas: [
      'Consumo elevado en ciudad',
      'Repuestos con demora',
      'Peso considerable para maniobras'
    ],
    datosTecnicos: [
      'Motor: 3.5L V6 Nafta',
      'Potencia: 254 HP',
      'Tracción: 4WD Intelligent',
      'Consumo: 11.5L/100km'
    ]
  },
  {
    id: 8,
    name: 'Ford Explorer 3.5 V6',
    subtitle: '4x4 · Nafta · 2013',
    category: '4x4 / SUV',
    tags: ['Familia', 'Ciudad', 'Ruta'],
    fit: 82,
    description: 'SUV americano grande con espacio para 7 y tracción AWD. Perfecto para familias que priorizan confort, seguridad y presencia.',
    ventajas: [
      'Maletero enorme para SUV',
      'Confort de manejo destacado',
      'Tecnología y conectividad completa',
      'Calificación de seguridad 5 estrellas'
    ],
    desventajas: [
      'Consumo muy elevado en ciudad',
      'Difícil de maniobrar en espacios reducidos',
      'Repuestos íntegramente importados'
    ],
    datosTecnicos: [
      'Motor: 3.5L V6 Nafta',
      'Potencia: 294 HP',
      'Tracción: AWD automático',
      'Consumo: 12.8L/100km'
    ]
  },
  // ── Camionetas ───────────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'Toyota Hilux DC 4x4',
    subtitle: '4x4 · Diesel · 2011',
    category: 'Camionetas',
    tags: ['Trabajo', 'Off-road'],
    fit: 75,
    description: 'Pickup indestructible diseñada para trabajo pesado. Ofrece capacidad de carga superior y tracción 4x4 confiable.',
    ventajas: [
      'Durabilidad extrema',
      'Capacidad de carga 1 tonelada',
      'Mecánica probada',
      'Reventa excelente'
    ],
    desventajas: [
      'Confort básico',
      'Suspensión dura sin carga',
      'Consumo urbano alto'
    ],
    datosTecnicos: [
      'Motor: 3.0L D-4D Turbo',
      'Potencia: 171 HP',
      'Carga útil: 1000 kg',
      'Consumo: 9.5L/100km'
    ]
  },
  {
    id: 5,
    name: 'VW Amarok 2.0 TDI',
    subtitle: '4x4 · Diesel · 2013',
    category: 'Camionetas',
    tags: ['Trabajo', 'Ruta'],
    fit: 70,
    description: 'Pickup europea con enfoque en confort y tecnología. Motor biturbo potente y tracción 4Motion permanente.',
    ventajas: [
      'Motor potente y refinado',
      'Confort superior a competidores',
      'Manejo tipo SUV',
      'Equipamiento completo'
    ],
    desventajas: [
      'Mantenimiento costoso',
      'Repuestos importados',
      'Reventa menor que competidores japoneses'
    ],
    datosTecnicos: [
      'Motor: 2.0L BiTDI',
      'Potencia: 180 HP',
      'Carga útil: 880 kg',
      'Consumo: 8.2L/100km'
    ]
  },
  {
    id: 9,
    name: 'Ford Ranger XLT 3.2',
    subtitle: '4x4 · Diesel · 2016',
    category: 'Camionetas',
    tags: ['Trabajo', 'Off-road', 'Ruta'],
    fit: 85,
    description: 'Pickup mediana de alta performance con motor 5 cilindros diesel. Una de las más vendidas por su equilibrio entre trabajo, off-road y confort en cabina.',
    ventajas: [
      'Motor con torque excepcional',
      'Cabina doble confortable',
      'Tracción 4x4 selectiva confiable',
      'Excelente valor de reventa'
    ],
    desventajas: [
      'Mantenimiento más caro que rivales',
      'Largo para estacionar en ciudad',
      'Precio de lista elevado'
    ],
    datosTecnicos: [
      'Motor: 3.2L Diesel 5 cil.',
      'Potencia: 197 HP',
      'Carga útil: 1000 kg',
      'Consumo: 8.8L/100km'
    ]
  },
  {
    id: 10,
    name: 'Chevrolet S10 2.8 TD',
    subtitle: '4x4 · Diesel · 2017',
    category: 'Camionetas',
    tags: ['Trabajo', 'Ruta'],
    fit: 77,
    description: 'Pickup brasileña con buen historial de confiabilidad y bajo costo de mantenimiento. Ideal para uso laboral intensivo con rutas largas frecuentes.',
    ventajas: [
      'Mantenimiento económico',
      'Piezas accesibles en el mercado',
      'Buen torque para carga',
      'Estabilidad sólida en ruta'
    ],
    desventajas: [
      'Interior básico',
      'Suspensión rígida sin carga',
      'Ruido de cabina a alta velocidad'
    ],
    datosTecnicos: [
      'Motor: 2.8L Duramax Diesel',
      'Potencia: 180 HP',
      'Carga útil: 950 kg',
      'Consumo: 9.0L/100km'
    ]
  },
  // ── Compactos ────────────────────────────────────────────────────────────────
  {
    id: 6,
    name: 'Ford Ecosport 1.6',
    subtitle: 'Nafta · 2015',
    category: 'Compactos',
    tags: ['Ciudad', 'Familia'],
    fit: 83,
    description: 'SUV compacta perfecta para ciudad. Ágil en tráfico, fácil de estacionar y económica en consumo urbano.',
    ventajas: [
      'Tamaño ideal para ciudad',
      'Bajo consumo urbano',
      'Mantenimiento económico',
      'Tecnología multimedia moderna'
    ],
    desventajas: [
      'Espacio interior limitado',
      'Motor justo para ruta',
      'Suspensión firme'
    ],
    datosTecnicos: [
      'Motor: 1.6L Nafta',
      'Potencia: 110 HP',
      'Tracción: Delantera',
      'Consumo: 7.8L/100km'
    ]
  },
  {
    id: 11,
    name: 'VW Gol Trend 1.6',
    subtitle: 'Nafta · 2018',
    category: 'Compactos',
    tags: ['Ciudad', 'Familia'],
    fit: 88,
    description: 'Clásico del mercado argentino, sinónimo de economía y practicidad. Excelente relación precio/mantenimiento con piezas disponibles en todo el país.',
    ventajas: [
      'Piezas baratas y muy accesibles',
      'Bajo consumo urbano',
      'Muy maniobrable',
      'Buen valor de reventa'
    ],
    desventajas: [
      'Sin airbags laterales en versiones base',
      'Caja de 5 velocidades sin 6ª',
      'Interior envejecido'
    ],
    datosTecnicos: [
      'Motor: 1.6L MSI Nafta',
      'Potencia: 101 HP',
      'Tracción: Delantera',
      'Consumo: 7.2L/100km'
    ]
  },
  {
    id: 12,
    name: 'Chevrolet Onix 1.4',
    subtitle: 'Nafta · 2020',
    category: 'Compactos',
    tags: ['Ciudad', 'Familia'],
    fit: 91,
    description: 'Compacto moderno con pantalla multimedia de 8" y excelente consumo. Uno de los más vendidos de Argentina por su equipamiento y bajo costo operativo.',
    ventajas: [
      'Tecnología multimedia moderna',
      'Consumo muy bajo',
      'Motor suave y confiable',
      'Garantía de fábrica activa'
    ],
    desventajas: [
      'Espacio trasero ajustado',
      'Baúl pequeño para la categoría',
      'Caja manual corta en autopista'
    ],
    datosTecnicos: [
      'Motor: 1.4L Ecotec Nafta',
      'Potencia: 98 HP',
      'Tracción: Delantera',
      'Consumo: 6.8L/100km'
    ]
  },
  {
    id: 13,
    name: 'Peugeot 208 1.6',
    subtitle: 'Nafta · 2019',
    category: 'Compactos',
    tags: ['Ciudad', 'Ruta'],
    fit: 79,
    description: 'Hatchback francés con diseño diferenciador y motor ágil para su categoría. Disfrutable en ciudad y cómodo en rutas cortas-medias.',
    ventajas: [
      'Diseño atractivo y diferenciado',
      'Motor ágil para la categoría',
      'Buen agarre en curvas',
      'Equipamiento de gama media completo'
    ],
    desventajas: [
      'Mantenimiento costoso vs. rivales japoneses',
      'Repuestos más caros',
      'Baúl pequeño'
    ],
    datosTecnicos: [
      'Motor: 1.6L VTi Nafta',
      'Potencia: 115 HP',
      'Tracción: Delantera',
      'Consumo: 7.5L/100km'
    ]
  },
  // ── Sedanes ──────────────────────────────────────────────────────────────────
  {
    id: 14,
    name: 'Toyota Corolla 1.8',
    subtitle: 'Nafta · 2017',
    category: 'Sedanes',
    tags: ['Ciudad', 'Ruta', 'Familia'],
    fit: 93,
    description: 'Sedán de referencia mundial con inigualable historial de confiabilidad. Motor eficiente, interior amplio y excelente reventa garantizada en todo el mundo.',
    ventajas: [
      'Confiabilidad excepcional',
      'Reventa inmejorable en su categoría',
      'Motor eficiente ciudad/ruta',
      'Interior amplio para sedán'
    ],
    desventajas: [
      'Dinámica de manejo conservadora',
      'Precio de compra alto para el segmento',
      'Poco emocionante de conducir'
    ],
    datosTecnicos: [
      'Motor: 1.8L Dual VVT-i',
      'Potencia: 140 HP',
      'Tracción: Delantera',
      'Consumo: 7.0L/100km'
    ]
  },
  {
    id: 15,
    name: 'Honda Civic 1.5T',
    subtitle: 'Nafta Turbo · 2019',
    category: 'Sedanes',
    tags: ['Ciudad', 'Ruta'],
    fit: 86,
    description: 'Sedán deportivo con motor turbocargado de última generación. Combina potencia de motor mayor con la eficiencia de un 1.5L, y tecnología Honda Sensing de serie.',
    ventajas: [
      'Motor turbo potente y eficiente',
      'Diseño interior moderno',
      'Excelente comportamiento dinámico',
      'Honda Sensing activo de serie'
    ],
    desventajas: [
      'Mantenimiento más costoso en Argentina',
      'Repuestos principalmente importados',
      'Precio de entrada elevado'
    ],
    datosTecnicos: [
      'Motor: 1.5L VTEC Turbo',
      'Potencia: 174 HP',
      'Tracción: Delantera',
      'Consumo: 7.3L/100km'
    ]
  },
  {
    id: 16,
    name: 'VW Vento 2.5',
    subtitle: 'Nafta · 2014',
    category: 'Sedanes',
    tags: ['Ciudad', 'Ruta', 'Familia'],
    fit: 81,
    description: 'Sedán alemán con calidad de construcción superior y gran confort en ruta. Motor 2.5 de 5 cilindros suave y potente para un viaje placentero.',
    ventajas: [
      'Construcción sólida y silenciosa',
      'Confort en ruta excepcional',
      'Motor 5 cil. suave y potente',
      'Buen espacio interior'
    ],
    desventajas: [
      'Consumo moderado-alto',
      'Mantenimiento costoso',
      'Tecnología interior algo desactualizada'
    ],
    datosTecnicos: [
      'Motor: 2.5L 5 cilindros Nafta',
      'Potencia: 170 HP',
      'Tracción: Delantera',
      'Consumo: 8.5L/100km'
    ]
  },
  {
    id: 17,
    name: 'Renault Logan 1.6',
    subtitle: 'Nafta · 2016',
    category: 'Sedanes',
    tags: ['Ciudad', 'Familia'],
    fit: 76,
    description: 'Sedán de bajo costo operativo con baúl excepcionalmente grande para su categoría. Ideal para familias que priorizan practicidad y presupuesto ajustado.',
    ventajas: [
      'Baúl de 510 litros',
      'Mantenimiento muy económico',
      'Piezas accesibles en todo el país',
      'Alta habitabilidad para el precio'
    ],
    desventajas: [
      'Motor básico poco refinado',
      'Interior muy austero',
      'Sin equipamiento de seguridad avanzado'
    ],
    datosTecnicos: [
      'Motor: 1.6L K7M Nafta',
      'Potencia: 102 HP',
      'Tracción: Delantera',
      'Consumo: 7.4L/100km'
    ]
  },
  // ── Motos ────────────────────────────────────────────────────────────────────
  {
    id: 18,
    name: 'Honda CB 250 Twister',
    subtitle: 'Nafta · 2021',
    category: 'Motos',
    tags: ['Ciudad', 'Ruta'],
    fit: 89,
    description: 'Naked 250cc de referencia en Argentina. Motor refrigerado por aire confiable, liviana y ágil tanto en ciudad como en rutas de fin de semana.',
    ventajas: [
      'Consumo muy bajo',
      'Mantenimiento económico',
      'Fácil manejo para distintos niveles',
      'Excelente reventa'
    ],
    desventajas: [
      'Sin freno ABS en versiones base',
      'Suspensión trasera monoamortiguador simple',
      'Sin instrumentación digital'
    ],
    datosTecnicos: [
      'Motor: 249cc monocilíndrico',
      'Potencia: 26 HP',
      'Peso: 141 kg',
      'Consumo: 2.8L/100km'
    ]
  },
  {
    id: 19,
    name: 'Yamaha FZ25',
    subtitle: 'Nafta · 2022',
    category: 'Motos',
    tags: ['Ciudad', 'Ruta'],
    fit: 84,
    description: 'Naked urbana con inyección electrónica y tablero digital. Ofrece la mejor potencia del segmento 250cc con un diseño agresivo y frenos sólidos.',
    ventajas: [
      'Inyección electrónica confiable',
      'Tablero digital completo',
      'Mayor potencia del segmento',
      'Frenos de disco delantero y trasero'
    ],
    desventajas: [
      'Precio levemente mayor a rivales',
      'Repuestos Yamaha algo más caros',
      'Ergonomía ajustada para talles grandes'
    ],
    datosTecnicos: [
      'Motor: 249cc monocilíndrico FI',
      'Potencia: 27 HP',
      'Peso: 153 kg',
      'Consumo: 2.9L/100km'
    ]
  },
  {
    id: 20,
    name: 'Honda XR 150L',
    subtitle: 'Nafta · 2020',
    category: 'Motos',
    tags: ['Off-road', 'Ciudad'],
    fit: 72,
    description: 'Enduro-trail liviana para quien combina asfalto y tierra. Suspensión de largo recorrido, mecánica simple y bajo peso para todo tipo de caminos.',
    ventajas: [
      'Suspensión de largo recorrido para tierra',
      'Mecánica muy simple de mantener',
      'Peso muy bajo',
      'Consumo mínimo'
    ],
    desventajas: [
      'Velocidad limitada en autopista',
      'Sin instrumentación digital',
      'Asiento angosto para viajes largos'
    ],
    datosTecnicos: [
      'Motor: 149cc SOHC monocilíndrico',
      'Potencia: 13 HP',
      'Peso: 121 kg',
      'Consumo: 2.2L/100km'
    ]
  }
];

// Mapeo: link del Header → nombre de vista
const HEADER_VIEW_MAP = {
  'Vehículos': 'vehicles',
  'Comparador': 'comparador',
  'Nosotros': 'nosotros',
  'Contacto': 'contacto',
};

export default function App() {
  const [currentView, setCurrentView] = useState('vehicles');   // 'vehicles' | 'nosotros' | 'contacto'
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [sidebarCategory, setSidebarCategory] = useState('Todos los vehículos');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [compareVehicle, setCompareVehicle] = useState(null);
  const [logueado, setLogueado] = useState(false);
const [mostrarRegistro, setMostrarRegistro] = useState(false);
  if (!logueado) {
  if (mostrarRegistro) {
    return (
      <Formulario
        onRegister={() => setMostrarRegistro(false)}
      />
    );
  }

  return (
    <Login
      onLogin={() => setLogueado(true)}
      onGoToRegister={() => setMostrarRegistro(true)}
    />
  );
}

  // Qué link del Header aparece activo
  const activeNav = Object.entries(HEADER_VIEW_MAP).find(([, v]) => v === currentView)?.[0] ?? 'Vehículos';

  function handleNavChange(link) {
    const view = HEADER_VIEW_MAP[link];
    if (!view) return; // Comparador / Asesor IA: sin vista aún
    setCurrentView(view);
    setSelectedVehicle(null);
    setCompareVehicle(null);
  }

  function handleSidebarCategory(link) {
    setSidebarCategory(link);
    setActiveFilter('Todos');
    setCurrentView('vehicles');
    setSelectedVehicle(null);
    setCompareVehicle(null);
  }

  // Mapa de links INFO ÚTIL → vista
  const INFO_VIEW_MAP = { 'Guía de compra': 'guia' };

  function handleInfoLink(link) {
    const view = INFO_VIEW_MAP[link];
    if (!view) return;
    setCurrentView(view);
    setSelectedVehicle(null);
  }

  // ── Vista: detalle de vehículo ──────────────────────────────────────────────
  if (selectedVehicle !== null) {
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    const vehicleB = compareVehicle !== null ? vehicles.find(v => v.id === compareVehicle) : null;

    if (vehicle) {
      return (
        <div className="min-h-screen bg-[#f0f0f0]">
          <Header activeNav={activeNav} onNavChange={handleNavChange} />
          <div className="max-w-[1100px] mx-auto py-6 px-5">
            <VehicleDetail
              vehicle={vehicle}
              onBack={() => { setSelectedVehicle(null); setCompareVehicle(null); }}
              onCompare={() => setCompareVehicle(-1)} // -1 = abre buscador sin vehículo B elegido
            />
            {/* Comparador: si compareVehicle === -1 mostramos el modal de búsqueda directo */}
            {compareVehicle !== null && compareVehicle === -1 && (
              <VehicleComparator
                vehicleA={vehicle}
                vehicleB={null}
                vehicles={vehicles}
                onClose={() => setCompareVehicle(null)}
                onChangeB={(v) => setCompareVehicle(v.id)}
                openSearchImmediately
              />
            )}
            {vehicleB && compareVehicle !== -1 && (
              <VehicleComparator
                vehicleA={vehicle}
                vehicleB={vehicleB}
                vehicles={vehicles}
                onClose={() => setCompareVehicle(null)}
                onChangeB={(v) => setCompareVehicle(v.id)}
              />
            )}
          </div>
        </div>
      );
    }
  }

  // ── Vista: Comparador standalone ──────────────────────────────────────────
  if (currentView === 'comparador') {
    return (
      <div className="min-h-screen bg-[#f0f0f0]">
        <Header activeNav="Comparador" onNavChange={handleNavChange} />
        <div className="max-w-[1100px] mx-auto py-6 px-5">
          <div className="mb-4">
            <span className="text-[11px] text-[#9a9a9a]">
              Inicio › <span className="text-[#cc0000]">Comparador</span>
            </span>
          </div>
          <ComparadorPage vehicles={vehicles} onBack={() => setCurrentView('vehicles')} />
        </div>
      </div>
    );
  }

  // ── Vistas sin sidebar (Nosotros / Contacto) ───────────────────────────────
  if (currentView === 'nosotros' || currentView === 'contacto') {
    return (
      <div className="min-h-screen bg-[#f0f0f0]">
        <Header activeNav={activeNav} onNavChange={handleNavChange} />
        <div className="max-w-[1100px] mx-auto py-6 px-5">
          {currentView === 'nosotros' && <Nosotros onBack={() => setCurrentView('vehicles')} />}
          {currentView === 'contacto' && <Contacto onBack={() => setCurrentView('vehicles')} />}
        </div>
      </div>
    );
  }

  // ── Vista: Guía de compra (con sidebar visible) ────────────────────────────
  if (currentView === 'guia') {
    return (
      <div className="min-h-screen bg-[#f0f0f0]">
        <Header activeNav={activeNav} onNavChange={handleNavChange} />
        <div className="max-w-[1100px] mx-auto py-6 px-5">
          <div className="flex gap-5">
            <Sidebar
              activeLink="Guía de compra"
              onVehicleCategoryChange={handleSidebarCategory}
              onInfoLinkChange={handleInfoLink}
            />
            <main className="flex-1 min-w-0">
              <div className="mb-4">
                <span className="text-[11px] text-[#9a9a9a]">
                  Inicio › <span className="text-[#cc0000]">Guía de compra</span>
                </span>
              </div>
              <GuiaDeCompra onBack={() => setCurrentView('vehicles')} />
            </main>
          </div>
        </div>
      </div>
    );
  }

  // ── Vista principal: catálogo ──────────────────────────────────────────────
  const filteredVehicles = vehicles
    .filter(v =>
      sidebarCategory === 'Todos los vehículos' || v.category === sidebarCategory
    )
    .filter(v =>
      activeFilter === 'Todos' ||
      v.tags.some(tag => {
        if (activeFilter === 'Ruta larga') return tag === 'Ruta';
        return tag === activeFilter;
      })
    );

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header activeNav={activeNav} onNavChange={handleNavChange} />

      <div className="max-w-[1100px] mx-auto py-6 px-5">
        <div className="flex gap-5">
          <Sidebar
            activeLink={sidebarCategory}
            onVehicleCategoryChange={handleSidebarCategory}
            onInfoLinkChange={handleInfoLink}
          />

          <main className="flex-1 min-w-0">
            <div className="mb-4">
              <span className="text-[11px] text-[#9a9a9a]">
                Inicio › <span className="text-[#cc0000]">Vehículos</span>
                {sidebarCategory !== 'Todos los vehículos' && (
                  <> › <span className="text-[#1a1a1a]">{sidebarCategory}</span></>
                )}
              </span>
            </div>

            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <div className="mt-4 mb-3">
              <span className="text-[12px] text-[#9a9a9a]">
                Mostrando{' '}
                <span className="font-semibold text-[#1a1a1a]">{filteredVehicles.length}</span>{' '}
                vehículos
              </span>
            </div>

            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-[32px] mb-3">🔍</span>
                <p className="text-[14px] text-[#9a9a9a]">
                  No hay vehículos en esta categoría todavía.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
