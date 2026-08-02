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
import { AsesorIA } from './components/AsesorIA';
import { vehicles, categories, marcas } from './data/vehicles.js';

// Mapeo: link del Header → nombre de vista
const HEADER_VIEW_MAP = {
  'Vehículos': 'vehicles',
  'Comparador': 'comparador',
  'Asesor IA': 'asesor',
  'Nosotros': 'nosotros',
  'Contacto': 'contacto',
};

export default function App() {
  const [currentView, setCurrentView] = useState('vehicles');   // 'vehicles' | 'nosotros' | 'contacto'
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [sidebarCategory, setSidebarCategory] = useState('Todos los vehículos');
  const [sidebarMarca, setSidebarMarca] = useState('Todas las marcas');
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
    if (!view) return; // Asesor IA: sin vista aún
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

  function handleSidebarMarca(link) {
    setSidebarMarca(link);
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
    const vehicleB = compareVehicle !== null && compareVehicle !== -1
      ? vehicles.find(v => v.id === compareVehicle)
      : null;

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
            {compareVehicle === -1 && (
              <VehicleComparator
                vehicleA={vehicle}
                vehicleB={null}
                vehicles={vehicles}
                onClose={() => setCompareVehicle(null)}
                onChangeB={(v) => setCompareVehicle(v.id)}
                openSearchImmediately
              />
            )}
            {vehicleB && (
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

  // ── Vista: Asesor IA ───────────────────────────────────────────────────────
  if (currentView === 'asesor') {
    return (
      <div className="min-h-screen bg-[#f0f0f0]">
        <Header activeNav="Asesor IA" onNavChange={handleNavChange} />
        <div className="max-w-[1100px] mx-auto py-6 px-5">
          <AsesorIA onBack={() => setCurrentView('vehicles')} />
        </div>
      </div>
    );
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
              categories={categories}
              marcas={marcas}
              activeMarca={sidebarMarca}
              onVehicleCategoryChange={handleSidebarCategory}
              onMarcaChange={handleSidebarMarca}
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
      sidebarMarca === 'Todas las marcas' || v.marca === sidebarMarca
    )
    .filter(v =>
      activeFilter === 'Todos' || v.tags.includes(activeFilter)
    );

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header activeNav={activeNav} onNavChange={handleNavChange} />

      <div className="max-w-[1100px] mx-auto py-6 px-5">
        <div className="flex gap-5">
          <Sidebar
            activeLink={sidebarCategory}
            categories={categories}
            marcas={marcas}
            activeMarca={sidebarMarca}
            onVehicleCategoryChange={handleSidebarCategory}
            onMarcaChange={handleSidebarMarca}
            onInfoLinkChange={handleInfoLink}
          />

          <main className="flex-1 min-w-0">
            <div className="mb-4">
              <span className="text-[11px] text-[#9a9a9a]">
                Inicio › <span className="text-[#cc0000]">Vehículos</span>
                {sidebarCategory !== 'Todos los vehículos' && (
                  <> › <span className="text-[#1a1a1a]">{sidebarCategory}</span></>
                )}
                {sidebarMarca !== 'Todas las marcas' && (
                  <> › <span className="text-[#1a1a1a]">{sidebarMarca}</span></>
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