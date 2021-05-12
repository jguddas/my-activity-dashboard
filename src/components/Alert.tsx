/* eslint-disable react/destructuring-assignment */
import React from 'react'

type Props = any
type State = {
  message?: string,
  confirmText?: string,
  p?: {
    resolve:(confirmed:boolean)=>void
    reject:()=>void
  }
}

class Alert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  call = (message:string, confirmText?: string): Promise<boolean> => (
    new Promise<boolean>((resolve, reject) => {
      this.setState((prevState) => {
        if (prevState.p) prevState.p.reject()
        return ({
          message,
          confirmText,
          p: {
            resolve: (confirmed: boolean) => {
              this.setState({ p: undefined })
              resolve(confirmed)
            },
            reject,
          },
        })
      })
    }))

  render(): JSX.Element | null {
    if (!this.state.p) return null
    return (
      <div className="static-modal">
        <div
          tabIndex={-1}
          role="dialog"
          className="modal"
          style={{ display: 'block', backdropFilter: 'blur(4px)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content" role="document">
              <div
                className="modal-body"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {this.state.message}
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  onClick={() => this.state.p?.resolve(false)}
                  className="btn btn-secondary"
                  type="button"
                >
                  Close
                </button>
                {this.state.confirmText ? (
                  <button
                    onClick={() => this.state.p?.resolve(true)}
                    className="btn btn-purple"
                    type="button"
                  >
                    {this.state.confirmText}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Alert
