// import { GitCompare, X } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { EmptyState } from '../../../components/feedback/EmptyState'
// import { Button } from '../../../components/ui/Button'
// import { Container } from '../../../components/ui/Container'
// import { formatCurrency } from '../../../lib/formatters/currency'
// import { useCompareStore } from '../../../store/slices/useCompareStore'

// export function ComparePage() {
//   const items = useCompareStore((state) => state.items)
//   const removeItem = useCompareStore((state) => state.removeItem)

//   if (items.length === 0) {
//     return (
//       <main className="page-section">
//         <Container>
//           <EmptyState
//             action={
//               <Link className="button button--primary" to="/catalog">
//                 <GitCompare aria-hidden="true" size={18} />
//                 <span>Add watches to compare</span>
//               </Link>
//             }
//             title="No watches selected for comparison"
//           />
//         </Container>
//       </main>
//     )
//   }

//   return (
//     <main className="page-section">
//       <Container>
//         <p className="eyebrow">Compare</p>
//         <h1>Compare up to three watches</h1>
//         <div className="compare-table">
//           {items.map((product) => (
//             <article key={product.id}>
//               <button
//                 aria-label={`Remove ${product.name}`}
//                 onClick={() => removeItem(product.id)}
//                 type="button"
//               >
//                 <X aria-hidden="true" size={18} />
//               </button>
//               <img alt={product.name} src={product.images[0]} />
//               <h2>{product.name}</h2>
//               <strong>{formatCurrency(product.price)}</strong>
//               <dl>
//                 <div>
//                   <dt>Brand</dt>
//                   <dd>{product.brand}</dd>
//                 </div>
//                 <div>
//                   <dt>Movement</dt>
//                   <dd>{product.type}</dd>
//                 </div>
//                 <div>
//                   <dt>Case</dt>
//                   <dd>{product.caseSize} mm</dd>
//                 </div>
//                 <div>
//                   <dt>Water resistance</dt>
//                   <dd>{product.waterResistance}</dd>
//                 </div>
//               </dl>
//               <Button onClick={() => removeItem(product.id)} variant="ghost">
//                 Remove
//               </Button>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </main>
//   )
// }
