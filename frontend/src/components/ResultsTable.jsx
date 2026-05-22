// import DealIndicator from "./Dealindicator";
// import FavoriteToggle from "./FavoriteToggle";

// export default function ResultsTable({ results = [], token }) {
//   console.log(results);
//   if (!results.length) {
//     return <p>No results to display.</p>;
//   }

//   return (
//     <table className="results-table">
//       <thead>
//         <tr>
//           <th>Year</th>
//           <th>Make</th>
//           <th>Model</th>
//           <th>Trim</th>
//           <th>State</th>
//           <th>MSRP</th>
//           <th>Sale Price</th>
//           <th>Markup ($)</th>
//           <th>Markup (%)</th>
//           <th>Deal</th>
//           {token && <th>Favorite</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {results.map((row) => (
//           <tr key={row.id}>
//             <td>{row.markup_year}</td>
//             <td>{row.make}</td>
//             <td>{row.model}</td>
//             <td>{row.trim}</td>
//             <td>{row.state_name}</td>

//             <td>${Number(row.msrp).toLocaleString()}</td>
//             <td>${Number(row.sale_price).toLocaleString()}</td>

//             <td>${Number(row.markup_dollar).toLocaleString()}</td>
//             <td>${Number(row.markup_percent).toFixed(1)}%</td>

//             <td>
//               <DealIndicator percent={Number(row.markup_percent)} />
//             </td>
//             {token && (
//               <td>
//                 <FavoriteToggle
//                   carId={row.id}
//                   initialFavorite={row.is_favorite}
//                 />
//               </td>
//             )}
//             <td>{row.removeButton}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// PAGE WITH STYLE
// import DealIndicator from "./DealIndicator";
// import FavoriteToggle from "./FavoriteToggle";

// export default function ResultsTable({ results = [], token }) {
//   console.log(results);

//   if (!results.length) {
//     return <p className="empty-state">No results to display.</p>;
//   }

//   return (
//     <table className="results-table">
//       <thead>
//         <tr>
//           <th>Year</th>
//           <th>Make</th>
//           <th>Model</th>
//           <th>Trim</th>
//           <th>State</th>
//           <th>MSRP</th>
//           <th>Sale Price</th>
//           <th>Markup ($)</th>
//           <th>Markup (%)</th>
//           <th>Deal</th>
//           {token && <th>Favorite</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {results.map((row) => (
//           <tr key={row.id}>
//             <td>{row.markup_year}</td>
//             <td>{row.make}</td>
//             <td>{row.model}</td>
//             <td>{row.trim}</td>
//             <td>{row.state_name}</td>

//             <td className="col-msrp">${Number(row.msrp).toLocaleString()}</td>
//             <td className="col-sale">
//               ${Number(row.sale_price).toLocaleString()}
//             </td>

//             <td className="col-markup-dollar">
//               ${Number(row.markup_dollar).toLocaleString()}
//             </td>
//             <td className="col-markup-pct">
//               {Number(row.markup_percent).toFixed(1)}%
//             </td>

//             <td>
//               <DealIndicator percent={Number(row.markup_percent)} />
//             </td>

//             {token && (
//               <td>
//                 <FavoriteToggle
//                   carId={row.id}
//                   initialFavorite={row.is_favorite}
//                 />
//               </td>
//             )}

//             {row.removeButton && <td>{row.removeButton}</td>}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// ADDING DETAIL PAGE
import { Link } from "react-router";
import DealIndicator from "./DealIndicator";
import FavoriteToggle from "./FavoriteToggle";

export default function ResultsTable({ results = [], token }) {
  if (!results.length) {
    return <p className="empty-state">No results to display.</p>;
  }

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Make</th>
          <th>Model</th>
          <th>Trim</th>
          <th>State</th>
          <th>MSRP</th>
          <th>Sale Price</th>
          <th>Markup ($)</th>
          <th>Markup (%)</th>
          <th>Deal</th>
          {token && <th>Favorite</th>}
        </tr>
      </thead>

      <tbody>
        {results.map((row) => (
          <tr key={row.id}>
            <td>{row.markup_year}</td>

            {/* ⭐ Make is now a clickable link */}
            <td>
              <Link
                to={`/cars/${row.car_id || row.id}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {row.make}
              </Link>
            </td>

            <td>{row.model}</td>
            <td>{row.trim}</td>
            <td>{row.state_name}</td>

            <td className="col-msrp">${Number(row.msrp).toLocaleString()}</td>

            <td className="col-sale">
              ${Number(row.sale_price).toLocaleString()}
            </td>

            <td className="col-markup-dollar">
              ${Number(row.markup_dollar).toLocaleString()}
            </td>

            <td className="col-markup-pct">
              {Number(row.markup_percent).toFixed(1)}%
            </td>

            <td>
              <DealIndicator percent={Number(row.markup_percent)} />
            </td>

            {token && (
              <td>
                <FavoriteToggle
                  carId={row.id}
                  initialFavorite={row.is_favorite}
                />
              </td>
            )}

            {row.removeButton && <td>{row.removeButton}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
