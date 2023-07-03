import { MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'

export const ReceptionBody = (body: any) => {
  const tmpDates = body.dates as []
  const dateObj: any[] = []
  tmpDates.map((date: string) => {
    const res = SELECTER_DAYS.filter((rec) => rec.value == date)
    dateObj.push(...res)
  })

  const tmpCategory = body.categories as []
  const categoryObj: any[] = []
  tmpCategory.map((category) => {
    const res = MULTISELECT_ITEMS.filter((rec) => rec.value == category)
    categoryObj.push(...res)
  })

  const fontFamily =
    'Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, Osaka, sans-serif'

  return (
    <>
      <table
        width="100%"
        style={{
          borderCollapse: 'collapse',
          borderSpacing: 0,
          border: 'none',
          verticalAlign: 'top',
          fontSize: '14px',
          fontFamily: fontFamily,
          backgroundColor: '#e3007f',
          textAlign: 'center',
        }}
      >
        <tr
          style={{
            fontSize: '14px',
            fontFamily: fontFamily,
            color: '#323333',
          }}
        >
          <td
            style={{
              fontSize: '14px',
              fontFamily: fontFamily,
              color: '#323333',
            }}
          >
            <table
              style={{
                margin: '0 auto',
                borderCollapse: 'collapse',
                borderSpacing: 0,
                border: '0 none',
                verticalAlign: 'top',
                fontSize: '14px',
                fontFamily: fontFamily,
                color: '#323333',
                width: '95%',
                maxWidth: '640px',
              }}
            >
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: '#323333',
                    paddingBottom: '5px',
                    paddingTop: '15px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: '#323333',
                      display: 'block',
                    }}
                  >
                    <img
                      src="https://libecity-fes-ticket-git-feature-schedule-mororyou.vercel.app/images/logo.png"
                      style={{
                        width: '85%',
                        margin: 0,
                        padding: 0,
                        border: '0 none',
                        outline: 'none',
                        lineHeight: '100%',
                        textDecoration: 'none',
                        verticalAlign: 'bottom',
                        fontSize: '14px',
                        fontFamily: fontFamily,
                        color: '#323333',
                      }}
                    />
                  </p>
                  <table
                    width="100%"
                    style={{
                      borderCollapse: 'collapse',
                      borderSpacing: 0,
                      border: 'none',
                      verticalAlign: 'top',
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: '#323333',
                    }}
                  >
                    <tr
                      style={{
                        fontSize: '14px',
                        fontFamily: fontFamily,
                        color: '#323333',
                      }}
                    >
                      <td
                        style={{
                          fontSize: '14px',
                          fontFamily: fontFamily,
                          color: '#323333',
                          textAlign: 'center',
                        }}
                      >
                        <h1
                          style={{
                            margin: 0,
                            padding: 0,
                            fontSize: '24px',
                            fontFamily: fontFamily,
                            color: '#fff',
                            marginBottom: '5px',
                            marginTop: '10px',
                          }}
                        >
                          お申し込みを受け付けました
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <table
        width="100%"
        style={{
          borderCollapse: 'collapse',
          borderSpacing: 0,
          verticalAlign: 'top',
          fontSize: '14px',
          fontFamily: fontFamily,
          color: '#323333',
          textAlign: 'center',
        }}
      >
        <tr
          style={{
            fontSize: '14px',
            fontFamily: fontFamily,
            color: '#323333',
          }}
        >
          <td
            style={{
              fontSize: '14px',
              fontFamily: fontFamily,
              color: '#323333',
            }}
          >
            <table
              style={{
                margin: '0 auto',
                borderCollapse: 'collapse',
                borderSpacing: 0,
                border: '0 none',
                verticalAlign: 'top',
                fontSize: '14px',
                fontFamily: fontFamily,
                color: '#323333',
                width: '95%',
                maxWidth: '640px',
              }}
            >
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: '#323333',
                    paddingTop: '28px',
                    textAlign: 'left',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    この度は、【ITお悩み相談】へお申し込みいただき誠にありがとうございます。
                    <br />
                    以下の内容でご予約を承りましたのでご確認ください。
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    ※本メールは自動送信される確認メールです。ご返信は不要です。予約が確定次第、
                    <strong>【予約確定メール】</strong>
                    をお送りいたしますので、しばらくお待ちいただきますようお願い申し上げます。
                  </p>
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: '#323333',
                  }}
                >
                  <hr
                    style={{
                      margin: '28px 0',
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: '#323333',
                      backgroundColor: '#ECEFF1',
                      position: 'relative',
                      height: '1px',
                      border: 'none',
                      width: '100%',
                    }}
                  />
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: '#323333',
                    paddingTop: '14px',
                    textAlign: 'left',
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '21.875px',
                      fontFamily: fontFamily,
                      color: '',
                      marginBottom: '14px',
                    }}
                  >
                    お申し込み内容
                  </h2>
                  <h3
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    お名前（リベシティ名）
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {body.name}
                  </p>
                  {body.url && (
                    <div>
                      <h3
                        style={{
                          marginBottom: '8px',
                        }}
                      >
                        リベシティプロフィールURL
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          padding: 0,
                          fontSize: fontFamily,
                          color: '#323333',
                          display: 'block',
                          marginBottom: '14px',
                        }}
                      >
                        <a href={body.url}>{body.url}</a>
                      </p>
                    </div>
                  )}
                  <h3
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    メールアドレス
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {body.email}
                  </p>
                  <h3
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    希望日時
                  </h3>
                  {dateObj.map((date: any, index: number) => (
                    <span key={index}>
                      <li>{date.label}</li>
                    </span>
                  ))}

                  <h3
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    相談カテゴリ
                  </h3>
                  {categoryObj.map((category: any, index: number) => (
                    <span key={index}>
                      <li>{category.label}</li>
                    </span>
                  ))}
                  <h3
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    相談内容（具体的にお願いします）
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {body.content ? body.content : '特になし'}
                  </p>
                  <h3
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    その他
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {body.etc ? body.etc : '特になし'}
                  </p>
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: '#323333',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  ></p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                      textAlign: 'center',
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        maxWidth: '300px',
                        width: '85%',
                        margin: '0 1em',
                        padding: '0.5em 1em',
                        fontSize: '1.2em',
                        fontFamily: fontFamily,
                        color: '#FFF',
                        textDecoration: 'none',
                        borderRadius: '2px',
                        display: 'inline-block',
                        backgroundColor: '#e3007f',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          display: 'inline-block',
                          marginBottom: '-2px',
                        }}
                      >
                        ITお悩み相談 by 福岡クリエイターズ
                      </span>
                      <br />
                      Webサイトはこちら
                    </a>
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                      textAlign: 'center',
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        maxWidth: '300px',
                        width: '85%',
                        margin: '0 1em',
                        padding: '0.5em 1em',
                        fontSize: '1.2em',
                        fontFamily: fontFamily,
                        color: '#FFF',
                        textDecoration: 'none',
                        borderRadius: '2px',
                        display: 'inline-block',
                        backgroundColor: '#384860',
                      }}
                    >
                      ユーザーコミュニティはこちら
                    </a>
                  </p>
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: '#323333',
                  }}
                >
                  <hr
                    style={{
                      margin: '28px 0',
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: '#323333',
                      backgroundColor: '#ECEFF1',
                      position: 'relative',
                      height: '1px',
                      border: 'none',
                      width: '100%',
                    }}
                  />
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    paddingTop: '14px',
                    paddingBottom: '28px',
                    color: '#323333',
                    textAlign: 'left',
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '21.875px',
                      fontFamily: fontFamily,
                      color: '#323333',
                      marginBottom: '14px',
                    }}
                  >
                    予約内容の変更をしたい場合
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    以下の「お申し込みをキャンセルする」ボタンよりキャンセルの上、再度お手続きをお願いいたします。
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: '#323333',
                      display: 'block',
                      marginBottom: '14px',
                      textAlign: 'center',
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        maxWidth: '300px',
                        width: '85%',
                        margin: '0 1em',
                        padding: '1em',
                        fontSize: '1.2em',
                        fontFamily: fontFamily,
                        color: '#e3007f',
                        textDecoration: 'none',
                        border: 'solid 1px #e3007f',
                        borderRadius: '2px',
                        display: 'inline-block',
                        backgroundColor: '#fff',
                      }}
                    >
                      お申し込みをキャンセルする
                    </a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        width="100%"
        style={{
          borderCollapse: 'collapse',
          borderSpacing: 0,
          border: '0 none',
          verticalAlign: 'top',
          fontSize: '14px',
          fontFamily: fontFamily,
          color: '#414C58',
          backgroundColor: '#e3007f',
          textAlign: 'center',
        }}
      >
        <tr
          style={{
            fontSize: '14px',
            fontFamily: fontFamily,
            color: '#595959',
          }}
        >
          <td
            style={{
              fontSize: '14px',
              fontFamily: fontFamily,
              color: '#323333',
            }}
          >
            <table
              style={{
                margin: '0 auto',
                borderCollapse: 'collapse',
                borderSpacing: 0,
                border: '0 none',
                verticalAlign: 'top',
                fontSize: '14px',
                fontFamily: fontFamily,
                color: '#595959',
                width: '95%',
                maxWidth: '640px',
              }}
            >
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: '#323333',
                }}
              >
                <td
                  style={{
                    fontSize: '12px',
                    fontFamily: fontFamily,
                    color: '#595959',
                    paddingBottom: '14px',
                    paddingTop: '28px',
                    textAlign: 'left',
                  }}
                ></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </>
  )
}
