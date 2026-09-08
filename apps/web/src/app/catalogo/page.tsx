'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api, money } from '@/lib/api';

type Service = { _id: string; name: string; description: string; price: number; durationMinutes: number; active: boolean };
type FormState = { name: string; description: string; price: string; durationMinutes: string };

const emptyForm: FormState = { name: '', description: '', price: '', durationMinutes: '60' };

export default function Catalogo() {
  const [services, setServices] = useState<Service[]>([]);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState('');

  async function loadServices(isAdmin: boolean) {
    try {
      setServices(await api(`/services${isAdmin ? '?all=true' : ''}`));
    } catch {
      setMessage('No se pudo cargar el catálogo.');
    }
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(storedUser);
    loadServices(storedUser?.role === 'ADMIN');
  }, []);

  async function createService(event: FormEvent) {
    event.preventDefault();
    try {
      await api('/services', {
        method: 'POST',
        body: JSON.stringify({ ...form, price: Number(form.price), durationMinutes: Number(form.durationMinutes) }),
      });
      setForm(emptyForm);
      setMessage('Servicio creado correctamente.');
      loadServices(true);
    } catch (error: any) {
      setMessage(error.message || 'No se pudo crear el servicio.');
    }
  }

  async function toggleService(service: Service) {
    try {
      await api(`/services/${service._id}`, { method: 'PATCH', body: JSON.stringify({ active: !service.active }) });
      loadServices(true);
    } catch (error: any) {
      setMessage(error.message || 'No se pudo actualizar el servicio.');
    }
  }

  return (
    <main className="dashboard">
      <div className="container">
        <div className="kicker">Oferta de la academia</div>
        <h2>Catálogo de servicios</h2>
        <p className="muted">Consulta los servicios disponibles y sus tarifas.</p>

        {user?.role === 'ADMIN' && (
          <section className="card" style={{ margin: '28px 0' }}>
            <div className="kicker">Administración</div>
            <h3>Agregar servicio</h3>
            <form className="form" onSubmit={createService}>
              <div className="grid2">
                <div className="field"><label>Nombre</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="field"><label>Precio (COP)</label><input required type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
              </div>
              <div className="field"><label>Descripción</label><textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div className="field"><label>Duración en minutos</label><input required type="number" min="1" value={form.durationMinutes} onChange={e => setForm({ ...form, durationMinutes: e.target.value })} /></div>
              <button className="btn" type="submit">Guardar servicio</button>
            </form>
          </section>
        )}

        {message && <p className="muted">{message}</p>}
        <div className="plans">
          {services.map(service => (
            <article className="card" key={service._id} style={{ opacity: service.active ? 1 : .55 }}>
              <div className="kicker">{service.active ? 'Disponible' : 'Inactivo'}</div>
              <h3>{service.name}</h3>
              <p className="muted">{service.description}</p>
              <div className="price">{money(service.price)} <small style={{ fontSize: 14 }}>/ servicio</small></div>
              <p className="muted">Duración: {service.durationMinutes} minutos</p>
              {user?.role === 'ADMIN' && <button className="btn secondary" type="button" onClick={() => toggleService(service)}>{service.active ? 'Desactivar' : 'Activar'}</button>}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
