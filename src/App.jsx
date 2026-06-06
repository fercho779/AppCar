import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FilterBar } from './components/FilterBar';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetail } from './components/VehicleDetail';
import { Nosotros } from './components/Nosotros';
import { Contacto } from './components/Contacto';
import { GuiaDeCompra } from './components/GuiaDeCompra';

const vehicles = [
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
  }
];

// Mapeo: link del Header → nombre de vista
const HEADER_VIEW_MAP = {
  'Vehículos': 'vehicles',
  'Nosotros': 'nosotros',
  'Contacto': 'contacto',
};

export default function App() {
  const [currentView, setCurrentView] = useState('vehicles');   // 'vehicles' | 'nosotros' | 'contacto'
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [sidebarCategory, setSidebarCategory] = useState('Todos los vehículos');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Qué link del Header aparece activo
  const activeNav = Object.entries(HEADER_VIEW_MAP).find(([, v]) => v === currentView)?.[0] ?? 'Vehículos';

  function handleNavChange(link) {
    const view = HEADER_VIEW_MAP[link];
    if (!view) return; // Comparador / Asesor IA: sin vista aún
    setCurrentView(view);
    setSelectedVehicle(null);
  }

  function handleSidebarCategory(link) {
    setSidebarCategory(link);
    setActiveFilter('Todos');
    setCurrentView('vehicles');
    setSelectedVehicle(null);
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
    if (vehicle) {
      return (
        <div className="min-h-screen bg-[#f0f0f0]">
          <Header activeNav={activeNav} onNavChange={handleNavChange} />
          <div className="max-w-[1100px] mx-auto py-6 px-5">
            <VehicleDetail vehicle={vehicle} onBack={() => setSelectedVehicle(null)} />
          </div>
        </div>
      );
    }
  }

  // ── Vistas sin sidebar (Nosotros / Contacto) ───────────────────────────────
  if (currentView === 'nosotros' || currentView === 'contacto') {
    return (
      <div className="min-h-screen bg-[#f0f0f0]">
        <Header activeNav={activeNav} onNavChange={handleNavChange} />
        <div className="max-w-[1100px] mx-auto py-6 px-5">
          {currentView === 'nosotros' && <Nosotros />}
          {currentView === 'contacto' && <Contacto />}
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
              <GuiaDeCompra />
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
