import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";

const C = {
  brand: "#3b5bdb", bg: "#f4f5f7", white: "#ffffff", text: "#0d1b2a",
  muted: "#6b7280", border: "#e5e7eb", green: "#22c55e", orange: "#f59e0b",
  red: "#ef4444", blue: "#3b5bdb",
};

const CHART_DATA = [
  { date: "04-12", revenue: 0, adSpend: 0 },
  { date: "04-16", revenue: 200, adSpend: 80 },
  { date: "04-20", revenue: 150, adSpend: 60 },
  { date: "04-24", revenue: 900, adSpend: 200 },
  { date: "04-28", revenue: 400, adSpend: 100 },
  { date: "05-02", revenue: 1441, adSpend: 0 },
  { date: "05-06", revenue: 300, adSpend: 0 },
  { date: "05-10", revenue: 200, adSpend: 0 },
];

const ORDERS = [
  { id: "ORD-1001", customer: "Sara Ahmed", city: "Cairo", items: 2, total: 1700, status: "pending", bosta: null, date: "2026-05-09" },
  { id: "ORD-1002", customer: "Mohamed Ali", city: "Alexandria", items: 1, total: 1100, status: "shipped", bosta: "BST-88291", date: "2026-05-08" },
  { id: "ORD-1003", customer: "Nour Hassan", city: "Giza", items: 3, total: 2650, status: "delivered", bosta: "BST-88190", date: "2026-05-07" },
  { id: "ORD-1004", customer: "Yasmine Omar", city: "Cairo", items: 1, total: 450, status: "pending", bosta: null, date: "2026-05-10" },
  { id: "ORD-1005", customer: "Khaled Samir", city: "Mansoura", items: 2, total: 1950, status: "processing", bosta: null, date: "2026-05-09" },
];

const PRODUCTS = [
  { id: 1, sku: "ANT-001", name: "Classic Linen Shirt", stock: 42, price: 850, category: "Tops", status: "active" },
  { id: 2, sku: "ANT-002", name: "Slim Chino Pants", stock: 18, price: 1100, category: "Bottoms", status: "active" },
  { id: 3, sku: "ANT-003", name: "Oversized Tee", stock: 5, price: 450, category: "Tops", status: "low_stock" },
  { id: 4, sku: "ANT-004", name: "Cargo Shorts", stock: 0, price: 750, category: "Bottoms", status: "out_of_stock" },
  { id: 5, sku: "ANT-005", name: "Summer Dress", stock: 30, price: 1350, category: "Dresses", status: "active" },
];

const INVOICES = [
  { id: "INV-501", order: "ORD-1002", customer: "Mohamed Ali", amount: 1100, status: "paid", date: "2026-05-08" },
  { id: "INV-502", order: "ORD-1003", customer: "Nour Hassan", amount: 2650, status: "paid", date: "2026-05-07" },
  { id: "INV-503", order: "ORD-1001", customer: "Sara Ahmed", amount: 1700, status: "unpaid", date: "2026-05-09" },
  { id: "INV-504", order: "ORD-1004", customer: "Yasmine Omar", amount: 450, status: "unpaid", date: "2026-05-10" },
];

const EMPLOYEES = [
  { id: 1, name: "Layla Mostafa", role: "Store Manager", dept: "Operations", status: "active", joined: "2024-01-10" },
  { id: 2, name: "Omar Faris", role: "Fulfillment", dept: "Logistics", status: "active", joined: "2024-03-15" },
  { id: 3, name: "Dina Karim", role: "Customer Support", dept: "CRM", status: "active", joined: "2025-01-01" },
];

const CUSTOMERS = [
  { id: 1, name: "Sara Ahmed", email: "sara@example.com", orders: 5, spent: 6250, city: "Cairo", tier: "VIP" },
  { id: 2, name: "Mohamed Ali", email: "mali@example.com", orders: 3, spent: 3300, city: "Alexandria", tier: "Regular" },
  { id: 3, name: "Nour Hassan", email: "nour@example.com", orders: 7, spent: 9100, city: "Giza", tier: "VIP" },
  { id: 4, name: "Yasmine Omar", email: "yas@example.com", orders: 1, spent: 450, city: "Cairo", tier: "New" },
];const NAV_SECTIONS = [
  { key: "overview_group", label: null, items: [{ key: "dashboard", label: "Dashboard", icon: "grid" }] },
  { key: "inventory_group", label: "Inventory", icon: "box", collapsible: true, items: [
    { key: "stock", label: "Stock Overview", icon: "layers" },
    { key: "restock", label: "Restock Planner", icon: "clipboard" },
  ]},
  { key: "finance_group", label: "Finance", icon: "dollar", collapsible: true, items: [
    { key: "finance", label: "Finance Dashboard", icon: "grid" },
    { key: "cod", label: "COD Tracking", icon: "dollar" },
    { key: "expenses", label: "Expenses", icon: "clipboard" },
    { key: "profitability", label: "Profitability", icon: "trending" },
  ]},
  { key: "operations_group", label: "Operations", icon: "truck", collapsible: true, items: [
    { key: "orders", label: "Orders", icon: "orders" },
    { key: "returns", label: "Returns", icon: "returns" },
    { key: "failed", label: "Failed Deliveries", icon: "alert" },
  ]},
  { key: "pos_group", label: "POS / Bazaar", icon: "store", collapsible: true, items: [
    { key: "pos", label: "POS Interface", icon: "cart" },
    { key: "events", label: "Events", icon: "calendar" },
    { key: "history", label: "History", icon: "clock" },
  ]},
  { key: "hr_group", label: "HR", icon: "users", collapsible: true, items: [
    { key: "hr", label: "Team", icon: "users" },
  ]},
  { key: "crm_group", label: "CRM", icon: "mail", collapsible: true, items: [
    { key: "crm", label: "Customers", icon: "mail" },
  ]},
  { key: "settings_group", label: "Settings", icon: "settings", collapsible: true, items: [
    { key: "integrations", label: "Integrations", icon: "settings" },
    { key: "brand_settings", label: "Brand Settings", icon: "store" },
    { key: "team", label: "Team", icon: "users" },
  ]},
];

const paths = {
  grid: "M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z",
  box: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM4 5h16v2H4V5z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  clipboard: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  dollar: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15v1h-2v-1c-1.66-.55-2.83-2.09-2.83-3.5h2c0 .83.7 1.5 1.83 1.5s1.83-.67 1.83-1.5c0-.94-.94-1.5-2.33-1.5-1.94 0-3.5-1.06-3.5-3 0-1.41 1.17-2.95 2.83-3.5V5h2v1c1.66.55 2.83 2.09 2.83 3.5h-2c0-.83-.7-1.5-1.83-1.5s-1.83.67-1.83 1.5c0 .94.94 1.5 2.33 1.5 1.94 0 3.5 1.06 3.5 3 0 1.41-1.17 2.95-2.83 3.5z",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  truck: "M1 3h15v13H1V3zm15 4h4l3 3v6h-7V7zM5.5 17a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm11 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  orders: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2",
  returns: "M3 12a9 9 0 009 9 9 9 0 000-18 9 9 0 00-9 9zm9-5v5l3 3",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01",
  store: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10",
  cart: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18 M16 10a4 4 0 01-8 0",
  calendar: "M3 4h18v18H3V4zM16 2v4M8 2v4M3 10h18",
  clock: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3",
  users: "M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  settings: "M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z M12 15.6a3.6 3.6 0 100-7.2 3.6 3.6 0 000 7.2z",
  menu: "M3 12h18M3 6h18M3 18h18",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  monitor: "M2 3h20v15H2V3zm7 15v3m4-3v3m-5 3h6",
  plus: "M12 5v14M5 12h14",
  x: "M18 6L6 18M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  chevron_down: "M6 9l6 6 6-6",
  chevron_right: "M9 18l6-6-6-6",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  refresh: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
};

const Ic = ({ name, size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={paths[name] || paths.grid} />
  </svg>
);

const Badge = ({ status }) => {
  const map = {
    active: { bg: "#dcfce7", color: "#166534", label: "Active" },
    low_stock: { bg: "#fef9c3", color: "#854d0e", label: "Low Stock" },
    out_of_stock: { bg: "#fee2e2", color: "#991b1b", label: "Out of Stock" },
    pending: { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
    processing: { bg: "#dbeafe", color: "#1e40af", label: "Processing" },
    shipped: { bg: "#ede9fe", color: "#5b21b6", label: "Shipped" },
    delivered: { bg: "#dcfce7", color: "#166534", label: "Delivered" },
    paid: { bg: "#dcfce7", color: "#166534", label: "Paid" },
    unpaid: { bg: "#fee2e2", color: "#991b1b", label: "Unpaid" },
    VIP: { bg: "#fce7f3", color: "#9d174d", label: "VIP" },
    Regular: { bg: "#f3f4f6", color: "#374151", label: "Regular" },
    New: { bg: "#dbeafe", color: "#1e40af", label: "New" },
  };
  const s = map[status] || { bg: "#f3f4f6", color: "#374151", label: status };
  return <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{s.label}</span>;
};

const MetricCard = ({ label, value, sub, accentColor = C.green, icon }) => (
  <div style={{ background: C.white, borderRadius: 14, padding: "20px 20px 18px", borderLeft: 4px solid ${accentColor}, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flex: 1, minWidth: 160 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
      <Ic name={icon} size={18} color={C.muted} />
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color: C.text, marginTop: 10, letterSpacing: -0.5 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{sub}</div>}
  </div>
);

const TH = ({ children }) => (
  <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: 2px solid ${C.border}, whiteSpace: "nowrap" }}>{children}</th>
);
const TD = ({ children, bold }) => (
  <td style={{ padding: "13px 14px", fontSize: 13.5, color: bold ? C.text : "#374151", fontWeight: bold ? 700 : 400, borderBottom: 1px solid ${C.border}, verticalAlign: "middle" }}>{children}</td>
);const BostaModal = ({ order, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const ship = async () => {
    const key = localStorage.getItem("erp_bosta_key") || "";
    if (!key) { setResult({ error: "No Bosta API key. Go to Settings → Integrations." }); return; }
    setLoading(true);
    try {
      const res = await fetch("https://app.bosta.co/api/v0/deliveries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: key },
        body: JSON.stringify({
          type: 10,
          specs: { packageDetails: { itemsCount: order.items, description: Order ${order.id} } },
          cod: order.total,
          dropOffAddress: { city: { name: order.city }, firstLine: "Customer address" },
          receiver: { firstName: order.customer.split(" ")[0], lastName: order.customer.split(" ")[1] || "", phone: "01000000000" },
          notes: ERP Order ${order.id},
        }),
      });
      const data = await res.json();
      if (res.ok) setResult({ success: true, id: data._id || "BST-" + Math.random().toString(36).slice(2, 8).toUpperCase() });
      else setResult({ error: data.message || "Bosta API error. Check your key." });
    } catch { setResult({ error: "Could not reach Bosta API." }); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: C.white, borderRadius: 18, width: 400, padding: 28, boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span style={{ fontWeight: 800, fontSize: 17 }}>Create Bosta Shipment</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><Ic name="x" size={18} /></button>
        </div>
        <div style={{ background: C.bg, borderRadius: 10, padding: 14, marginBottom: 18, fontSize: 13 }}>
          <div style={{ fontWeight: 700 }}>{order.id} · {order.customer}</div>
          <div style={{ color: C.muted, marginTop: 3 }}>{order.city} · COD: EGP {order.total.toLocaleString()}</div>
        </div>
        {result ? (
          result.success
            ? <div style={{ background: "#dcfce7", borderRadius: 10, padding: 14, textAlign: "center", color: "#166534", fontWeight: 700 }}>✓ Shipment Created — {result.id}</div>
            : <div style={{ background: "#fee2e2", borderRadius: 10, padding: 14, color: "#991b1b", fontSize: 13 }}>{result.error}</div>
        ) : (
          <button onClick={ship} disabled={loading} style={{ width: "100%", background: "#e63946", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 14, cursor: loading ? "wait" : "pointer" }}>
            {loading ? "Creating…" : "📦 Create Shipment"}
          </button>
        )}
      </div>
    </div>
  );
};

const ApiModal = ({ onClose }) => {
  const [shopifyKey, setShopifyKey] = useState(localStorage.getItem("erp_shopify_key") || "");
  const [shopifyStore, setShopifyStore] = useState(localStorage.getItem("erp_shopify_store") || "");
  const [bostaKey, setBostaKey] = useState(localStorage.getItem("erp_bosta_key") || "");
  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem("erp_shopify_key", shopifyKey);
    localStorage.setItem("erp_shopify_store", shopifyStore);
    localStorage.setItem("erp_bosta_key", bostaKey);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const inp = { width: "100%", padding: "10px 12px", border: 1.5px solid ${C.border}, borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 10 };
  const lbl = { fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 5 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: C.white, borderRadius: 18, width: 500, maxWidth: "95vw", padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <span style={{ fontWeight: 800, fontSize: 19 }}>API Integrations</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><Ic name="x" size={20} /></button>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, background: "#96bf48", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14 }}>S</div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Shopify</span>
            <a href="https://shopify.dev/docs/api/admin-rest" target="_blank" rel="noreferrer" style={{ marginLeft: "auto", color: C.brand, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Ic name="link" size={12} /> Docs</a>
          </div>
          <label style={lbl}>Store URL</label>
          <input value={shopifyStore} onChange={e => setShopifyStore(e.target.value)} placeholder="your-store.myshopify.com" style={inp} />
          <label style={lbl}>Admin API Token</label>
          <input value={shopifyKey} onChange={e => setShopifyKey(e.target.value)} type="password" placeholder="shpat_••••••••" style={inp} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, background: "#e63946", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14 }}>B</div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Bosta</span>
            <a href="https://docs.bosta.co/api" target="_blank" rel="noreferrer" style={{ marginLeft: "auto", color: C.brand, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Ic name="link" size={12} /> Docs</a>
          </div>
          <label style={lbl}>Bosta API Key</label>
          <input value={bostaKey} onChange={e => setBostaKey(e.target.value)} type="password" placeholder="••••••••••••" style={inp} />
          <p style={{ fontSize: 11, color: C.muted, margin: "4px 0 0" }}>Get key from <a href="https://business.bosta.co" target="_blank" rel="noreferrer" style={{ color: C.brand }}>business.bosta.co</a> → Settings → API</p>
        </div>
        <button onClick={save} style={{ width: "100%", background: saved ? "#22c55e" : C.brand, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background .3s" }}>
          {saved ? "✓ Saved!" : "Save API Keys"}
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <div style={{ background: C.white, borderRadius: 10, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: C.muted, display: "flex", gap: 24, alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <span style={{ fontWeight: 700, color: C.text }}>Today</span>
      <span>Orders: <b>2</b></span>
      <span>Revenue: <b>EGP 1,441</b></span>
      <span>Ad spend: <b>EGP 0</b></span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
      <MetricCard label="Revenue MTD" value="EGP 1,441" sub="↑ +12% vs last month" accentColor={C.green} icon="dollar" />
      <MetricCard label="Orders MTD" value={2} sub="This month" accentColor={C.green} icon="orders" />
      <MetricCard label="Profit Margin" value="100.0%" sub="No ad spend" accentColor={C.green} icon="trending" />
      <MetricCard label="COD Pending" value="EGP 13,650" sub="Awaiting collection" accentColor={C.orange} icon="dollar" />
      <MetricCard label="Blended ROAS" value="0.00x" sub="No ad spend recorded" accentColor={C.green} icon="trending" />
      <MetricCard label="BEROAS" value="0.00x" sub="Breakeven target" accentColor={C.green} icon="trending" />
    </div>
    <div style={{ background: C.white, borderRadius: 14, padding: "22px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18, color: C.text }}>Revenue vs Ad Spend (30 days)</div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: C.muted }} />
          <YAxis tick={{ fontSize: 11, fill: C.muted }} />
          <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
          <Line type="monotone" dataKey="revenue" stroke={C.brand} strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="adSpend" stroke={C.orange} strokeWidth={2} dot={false} strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const OrdersPage = ({ setBostaOrder }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: C.text }}>Orders</div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.bg, color: C.text, border: 1px solid ${C.border}, borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}><Ic name="refresh" size={14} /> Sync Shopify</button>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}><Ic name="plus" size={14} /> New Order</button>
      </div>
    </div>
    <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{["Order ID","Customer","City","Items","Total (EGP)","Status","Bosta",""].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
        <tbody>
          {ORDERS.map(o => (
            <tr key={o.id}>
              <TD><code style={{ fontSize: 12, background: C.bg, padding: "2px 6px", borderRadius: 4 }}>{o.id}</code></TD>
              <TD bold>{o.customer}</TD>
              <TD>{o.city}</TD>
              <TD>{o.items}</TD>
              <TD bold>{o.total.toLocaleString()}</TD>
              <TD><Badge status={o.status} /></TD>
              <TD>{o.bosta ? <span style={{ fontSize: 12, color: "#5b21b6", fontWeight: 600 }}>{o.bosta}</span> : <span style={{ color: C.muted }}>—</span>}</TD>
              <TD>{!o.bosta && o.status !== "delivered" && (<button onClick={() => setBostaOrder(o)} style={{ background: "#e63946", color: "#fff", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Ship</button>)}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StockPage = () => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: C.text }}>Stock Overview</div>
      <button style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}><Ic name="plus" size={14} /> Add Product</button>
    </div>
    <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{["SKU","Product","Category","Stock","Price (EGP)","Status"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
        <tbody>
          {PRODUCTS.map(p => (
            <tr key={p.id}>
              <TD><code style={{ fontSize: 12, background: C.bg, padding: "2px 6px", borderRadius: 4 }}>{p.sku}</code></TD>
              <TD bold>{p.name}</TD>
              <TD>{p.category}</TD>
              <TD><span style={{ fontWeight: 700, color: p.stock === 0 ? C.red : p.stock <= 5 ? C.orange : C.text }}>{p.stock}</span></TD>
              <TD>{p.price.toLocaleString()}</TD>
              <TD><Badge status={p.status} /></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FinancePage = () => {
  const paid = INVOICES.filter(i => i.status === "paid").reduce((a, b) => a + b.amount, 0);
  const unpaid = INVOICES.filter(i => i.status === "unpaid").reduce((a, b) => a + b.amount, 0);
  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 22, color: C.text, marginBottom: 18 }}>Finance Dashboard</div>
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <MetricCard label="Collected" value={EGP ${paid.toLocaleString()}} sub="Paid invoices" accentColor={C.green} icon="dollar" />
        <MetricCard label="Outstanding" value={EGP ${unpaid.toLocaleString()}} sub="Unpaid" accentColor={C.red} icon="dollar" />
        <MetricCard label="Total Invoices" value={INVOICES.length} accentColor={C.blue} icon="clipboard" />
      </div>
      <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Invoice","Order","Customer","Amount (EGP)","Date","Status"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {INVOICES.map(i => (
              <tr key={i.id}>
                <TD><code style={{ fontSize: 12, background: C.bg, padding: "2px 6px", borderRadius: 4 }}>{i.id}</code></TD>
                <TD>{i.order}</TD>
                <TD bold>{i.customer}</TD>
                <TD bold>{i.amount.toLocaleString()}</TD>
                <TD>{i.date}</TD>
                <TD><Badge status={i.status} /></TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HRPage = () => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: C.text }}>Team</div>
      <button style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}><Ic name="plus" size={14} /> Add Employee</button>
    </div>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {EMPLOYEES.map(e => (
        <div key={e.id} style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flex: "1 1 220px", minWidth: 200 }}>
          <div style={{ width: 46, height: 46, background: C.brand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 12 }}>
            {e.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{e.name}</div>
          <div style={{ fontSize: 13, color: C.muted }}>{e.role}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{e.dept}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>Joined {e.joined}</div>
          <div style={{ marginTop: 10 }}><Badge status={e.status} /></div>
        </div>
      ))}
    </div>
  </div>
);

const CRMPage = () => (
  <div>
    <div style={{ fontWeight: 800, fontSize: 22, color: C.text, marginBottom: 18 }}>Customers</div>
    <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{["Customer","Email","City","Orders","Total Spent (EGP)","Tier"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
        <tbody>
          {CUSTOMERS.map(c => (
            <tr key={c.id}>
              <TD bold>{c.name}</TD>
              <TD>{c.email}</TD>
              <TD>{c.city}</TD>
              <TD>{c.orders}</TD>
              <TD bold>{c.spent.toLocaleString()}</TD>
              <TD><Badge status={c.tier} /></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const IntegrationsPage = ({ openApi }) => (
  <div>
    <div style={{ fontWeight: 800, fontSize: 22, color: C.text, marginBottom: 18 }}>Integrations</div>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {[
        { name: "Shopify", color: "#96bf48", desc: "Sync products, orders, and customers from your Shopify store.", docsUrl: "https://shopify.dev/docs/api/admin-rest" },
        { name: "Bosta", color: "#e63946", desc: "Create shipments, track deliveries, and manage COD collection.", docsUrl: "https://docs.bosta.co/api" },
      ].map(api => (
        <div key={api.name} style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flex: "1 1 220px", minWidth: 220 }}>
          <div style={{ width: 42, height: 42, background: api.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, marginBottom: 12 }}>{api.name[0]}</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{api.name}</div>
          <div style={{ fontSize: 13, color: C.muted, margin: "6px 0 14px" }}>{api.desc}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={openApi} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Configure</button>
            <a href={api.docsUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.bg, color: C.text, border: 1px solid ${C.border}, borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", textDecoration: "none" }}>Docs</a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Placeholder = ({ title }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, color: C.muted }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
    <div style={{ fontWeight: 700, fontSize: 18, color: C.text }}>{title}</div>
    <div style={{ fontSize: 13, marginTop: 6 }}>This module is coming soon.</div>
  </div>
);const NavItem = ({ item, active, setActive, sub }) => (
  <button onClick={() => setActive(item.key)} style={{
    display: "flex", alignItems: "center", gap: 10, width: "100%",
    padding: sub ? "8px 10px" : "9px 10px",
    background: active === item.key ? "#eef2ff" : "none",
    border: "none", borderRadius: 8, cursor: "pointer",
    color: active === item.key ? C.brand : C.muted,
    fontWeight: active === item.key ? 700 : 500,
    fontSize: sub ? 13 : 13.5, fontFamily: "inherit", textAlign: "left", marginBottom: 1,
  }}>
    <Ic name={item.icon} size={15} color={active === item.key ? C.brand : C.muted} />
    {item.label}
  </button>
);

const Sidebar = ({ active, setActive, open, setOpen }) => {
  const [collapsed, setCollapsed] = useState({});
  const toggle = key => setCollapsed(p => ({ ...p, [key]: !p[key] }));

  return (
    <>
      {open && <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 99 }} />}
      <aside style={{
        position: "fixed", top: 0, left: open ? 0 : -260, bottom: 0, width: 248,
        background: C.white, borderRight: 1px solid ${C.border},
        display: "flex", flexDirection: "column", zIndex: 100,
        transition: "left 0.25s ease", overflowY: "auto",
      }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: 1px solid ${C.border}, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 20, color: C.brand, letterSpacing: -0.5 }}>Anetos ERP</span>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><Ic name="x" size={18} /></button>
        </div>
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {NAV_SECTIONS.map(sec => {
            if (!sec.label) {
              return sec.items.map(item => (
                <NavItem key={item.key} item={item} active={active} setActive={k => { setActive(k); setOpen(false); }} />
              ));
            }
            const isOpen = !collapsed[sec.key];
            return (
              <div key={sec.key} style={{ marginBottom: 2 }}>
                <button onClick={() => toggle(sec.key)} style={{
                  display: "flex", alignItems: "center", width: "100%", padding: "9px 10px",
                  background: "none", border: "none", cursor: "pointer", borderRadius: 8,
                  color: C.text, fontWeight: 700, fontSize: 13.5, fontFamily: "inherit", gap: 10,
                }}>
                  <Ic name={sec.icon} size={16} color={C.muted} />
                  <span style={{ flex: 1, textAlign: "left" }}>{sec.label}</span>
                  <Ic name={isOpen ? "chevron_down" : "chevron_right"} size={14} color={C.muted} />
                </button>
                {isOpen && (
                  <div style={{ paddingLeft: 10 }}>
                    {sec.items.map(item => (
                      <NavItem key={item.key} item={item} active={active} setActive={k => { setActive(k); setOpen(false); }} sub />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: "14px 20px", borderTop: 1px solid ${C.border}, fontSize: 11, color: C.muted }}>
          Anetos ERP v1.0
        </div>
      </aside>
    </>
  );
};export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bostaOrder, setBostaOrder] = useState(null);
  const [apiOpen, setApiOpen] = useState(false);

  const pageTitle = {
    dashboard: "Dashboard", stock: "Stock Overview", restock: "Restock Planner",
    finance: "Finance Dashboard", cod: "COD Tracking", expenses: "Expenses",
    profitability: "Profitability", orders: "Orders", returns: "Returns",
    failed: "Failed Deliveries", pos: "POS Interface", events: "Events",
    history: "History", hr: "Team", crm: "Customers",
    integrations: "Integrations", brand_settings: "Brand Settings", team: "Team",
  };

  const renderPage = () => {
    switch (active) {
      case "dashboard": return <Dashboard />;
      case "orders": return <OrdersPage setBostaOrder={setBostaOrder} />;
      case "stock": return <StockPage />;
      case "finance": return <FinancePage />;
      case "hr": return <HRPage />;
      case "crm": return <CRMPage />;
      case "integrations": return <IntegrationsPage openApi={() => setApiOpen(true)} />;
      default: return <Placeholder title={pageTitle[active] || active} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('${FONT_LINK}');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: ${C.bg}; color: ${C.text}; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 5px; }
        button { font-family: 'Plus Jakarta Sans', sans-serif; }
        table { font-family: 'Plus Jakarta Sans', sans-serif; }
        tr:hover { background: #fafafa; }
      `}</style>

      {bostaOrder && <BostaModal order={bostaOrder} onClose={() => setBostaOrder(null)} />}
      {apiOpen && <ApiModal onClose={() => setApiOpen(false)} />}

      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />

      <div style={{ marginLeft: sidebarOpen ? 248 : 0, transition: "margin-left 0.25s ease", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: C.white, borderBottom: 1px solid ${C.border},
          padding: "12px 24px", display: "flex", alignItems: "center", gap: 16,
        }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex", alignItems: "center" }}>
            <Ic name="menu" size={20} />
          </button>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.brand }}>Anetos ERP</span>
          <div style={{ flex: 1 }} />
          <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><Ic name="monitor" size={20} /></button>
          <button onClick={() => setApiOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><Ic name="bell" size={20} /></button>
          <div style={{ width: 34, height: 34, background: C.brand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>A</div>
        </header>

        <main style={{ flex: 1, padding: "24px 28px", maxWidth: 1200 }}>
          <div style={{ marginBottom: 22 }}>
            <h1 style={{ fontWeight: 800, fontSize: 26, color: C.text, letterSpacing: -0.5 }}>{pageTitle[active] || active}</h1>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>May 10, 2026</div>
          </div>
          {renderPage()}
        </main>
      </div>
    </>
  );
}
