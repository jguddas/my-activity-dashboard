import React from 'react'
import { Link } from 'react-router-dom'

import { Split } from '../types/split'

type Props = { splits: Split[] }

const SplitsTable = ({ splits }:Props):JSX.Element => (
  <div className="table-responsive">
    <table className="table card-table table-striped">
      <tbody>
        {splits.map(({ id, name }) => (
          <tr
            className="d-block d-md-table-row"
            key={id}
          >
            <td>
              <Link to={`/split/${id}`}>
                {name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default SplitsTable
