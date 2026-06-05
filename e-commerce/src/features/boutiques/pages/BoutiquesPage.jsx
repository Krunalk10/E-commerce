// import { MapPin, Phone } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import { getBoutiques } from '../../../api'
// import { Container } from '../../../components/ui/Container'

// export function BoutiquesPage() {
//   const [boutiques, setBoutiques] = useState([])

//   useEffect(() => {
//     let isActive = true

//     async function loadBoutiques() {
//       const response = await getBoutiques()

//       if (isActive) {
//         setBoutiques(response.data)
//       }
//     }

//     loadBoutiques()

//     return () => {
//       isActive = false
//     }
//   }, [])

//   return (
//     <main className="page-section">
//       <Container>
//         <p className="eyebrow">Boutiques</p>
//         <h1>Visit a Chronora watch lounge</h1>
//         <div className="boutique-grid">
//           {boutiques.map((boutique) => (
//             <article key={boutique.id}>
//               <h2>{boutique.name}</h2>
//               <p>
//                 <MapPin aria-hidden="true" size={18} />
//                 {boutique.address}
//               </p>
//               <p>
//                 <Phone aria-hidden="true" size={18} />
//                 {boutique.phone}
//               </p>
//             </article>
//           ))}
//         </div>
//       </Container>
//     </main>
//   )
// }
