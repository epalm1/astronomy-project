import { createRoot } from 'react-dom/client'

const myelement = (
    <table>
        <tr>
            <th>Header</th>
        </tr>
        <tr>
            <td>Row 1</td>
        </tr>
        <tr>
            <td>Row 2</td>
        </tr>

    </table>
);
createRoot(document.getElementById('root')).render(
  myelement
)
