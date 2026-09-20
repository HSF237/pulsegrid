import { ChevronLeft, ChevronRight, ChevronsUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function DataTable({ rows }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "requests", direction: "desc" });
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)))
      .sort((a,b) => {
        const x=a[sort.key], y=b[sort.key];
        const result = typeof x === "number" ? x-y : String(x).localeCompare(String(y));
        return sort.direction === "asc" ? result : -result;
      });
  }, [rows, query, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length/pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage-1)*pageSize, currentPage*pageSize);
  const changeSort = key => {
    setSort(s => ({ key, direction: s.key === key && s.direction === "asc" ? "desc" : "asc" }));
    setPage(1);
  };

  return <section className="panel table-panel">
    <div className="table-toolbar"><div><p className="eyebrow">Workspace traffic</p><h2>Developer activity</h2></div><label className="table-search"><Search size={16}/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Filter users…"/></label></div>
    <div className="table-scroll"><table><thead><tr>{[["name","User"],["role","Role"],["requests","Requests"],["status","Status"]].map(([key,label])=><th key={key}><button onClick={()=>changeSort(key)}>{label}<ChevronsUpDown size={13}/></button></th>)}</tr></thead>
    <tbody>{visible.map(row=><tr key={row.id}><td><div className="user-cell"><span>{row.name.split(" ").map(x=>x[0]).join("")}</span><div><strong>{row.name}</strong><small>{row.email}</small></div></div></td><td>{row.role}</td><td className="mono">{row.requests.toLocaleString()}</td><td><span className={`row-status ${row.status.toLowerCase()}`}><i/>{row.status}</span></td></tr>)}</tbody></table>
    {!visible.length && <div className="empty">No matching users found.</div>}</div>
    <div className="pagination"><span>Showing {visible.length} of {filtered.length} results</span><div><button disabled={currentPage===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft size={16}/></button><span>Page {currentPage} / {pages}</span><button disabled={currentPage===pages} onClick={()=>setPage(p=>p+1)}><ChevronRight size={16}/></button></div></div>
  </section>;
}
