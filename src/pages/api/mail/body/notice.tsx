import { MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
dayjs.locale(ja)

export const NoticeBody = (body: any) => {
  const apply = body.apply
  const tmpDates = apply.dates as []
  const tmpCategory = apply.categories as []
  const dateObj: any[] = []
  const categoryObj: any[] = []
  tmpDates.map((date: string) => {
    const res = SELECTER_DAYS.filter((rec) => rec.value == date)
    dateObj.push(...res)
  })
  tmpCategory.map((category) => {
    const res = MULTISELECT_ITEMS.filter((rec) => rec.value == category)
    categoryObj.push(...res)
  })

  const schedule = body.schedule
  const fontFamily =
    'Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, Osaka, sans-serif'
  const baseColor = '#323333'
  return (
    <>
      <table
        width="100%"
        style={{
          borderCollapse: 'collapse',
          borderSpacing: 0,
          border: '0 none',
          verticalAlign: 'top',
          fontSize: '14px',
          fontFamily: fontFamily,
          color: '#3B5154',
          backgroundColor: '#e3007f',
          textAlign: 'center',
        }}
      >
        <tr
          style={{
            fontSize: '14px',
            fontFamily: fontFamily,
            color: baseColor,
          }}
        >
          <td
            style={{
              fontSize: '14px',
              fontFamily: fontFamily,
              color: baseColor,
            }}
          >
            <table
              style={{
                margin: '0 auto',
                borderCollapse: 'collapse',
                borderSpacing: 0,
                border: '0 none',
                fontSize: '14px',
                fontFamily: fontFamily,
                color: baseColor,
                width: '95%',
                maxWidth: '640px',
              }}
            >
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: baseColor,
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
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
                      color: baseColor,
                    }}
                  >
                    <img
                      src="https://libecity-fes-ticket.vercel.app/images/logo.png"
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
                        color: baseColor,
                      }}
                    />
                  </p>
                  <table
                    width="100%"
                    style={{
                      borderCollapse: 'collapse',
                      borderSpacing: 0,
                      border: '0 none',
                      verticalAlign: 'top',
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                    }}
                  >
                    <tr
                      style={{
                        fontSize: '14px',
                        fontFamily: fontFamily,
                        color: baseColor,
                      }}
                    >
                      <td
                        style={{
                          fontSize: '14px',
                          fontFamily: fontFamily,
                          color: baseColor,
                          textAlign: 'center',
                        }}
                      >
                        <h1
                          style={{
                            margin: 0,
                            padding: 0,
                            fontFamily: fontFamily,
                            color: '#ffffff',
                            marginBottom: '5px',
                            marginTop: '10px',
                          }}
                        >
                          ご予約が確定しました
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
        style={{
          margin: '0 auto',
          borderCollapse: 'collapse',
          borderSpacing: 0,
          border: '0 none',
          verticalAlign: 'top',
          fontSize: '14px',
          fontFamily: fontFamily,
          color: baseColor,
          textAlign: 'center',
        }}
      >
        <tr
          style={{
            fontSize: '14px',
            fontFamily: fontFamily,
            color: baseColor,
          }}
        >
          <td
            style={{
              fontSize: '14px',
              fontFamily: fontFamily,
              color: baseColor,
            }}
          >
            <table
              style={{
                margin: '0 auto',
                borderCollapse: 'collapse',
                borderSpacing: 0,
                verticalAlign: 'top',
                fontSize: '14px',
                fontFamily: fontFamily,
                color: baseColor,
                width: '95%',
                maxWidth: '640px',
              }}
            >
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: baseColor,
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
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
                      color: baseColor,
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    この度は、福岡クリエイターズ主催の【ITお悩み相談】へのご予約、誠にありがとうございます。
                    <br />
                    お申し込みいただいた以下の内容につきまして、ご予約が確定いたしました。
                  </p>
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: baseColor,
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
                  }}
                >
                  <hr
                    style={{
                      margin: '28px 0',
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
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
                  color: baseColor,
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
                    paddingTop: '14px',
                    paddingBottom: '28px',
                    textAlign: 'left',
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '21.875px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      marginBottom: '14px',
                    }}
                  >
                    予約日時
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '26px',
                      fontWeight: 'bold',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {dayjs(schedule.date).format('M日DD日(dd)')}
                    <span
                      style={{
                        display: 'inline-block',
                      }}
                    >
                      {dayjs(schedule.start).format('HH:mm')} 〜{' '}
                      {dayjs(schedule.end).format('HH:mm')}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    日時などの変更や、再度の予約をご希望の場合は、改めてお手続きをお願い申し上げます。
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    また、予約が空いている場合は、当日のご相談も承ることも可能ですので、気軽にブースにご来場いただけますとうれしいです。
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: 0,
                    }}
                  >
                    また、会場の入場制限によりご入場が難しい場合、その他ご不明な点や変更が必要な場合は、遠慮なく
                    <a href="fukuoka.creators@gmail.com">
                      fukuoka.creators@gmail.com
                    </a>
                    までご連絡ください。
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: 0,
                    }}
                  >
                    {apply.name}
                    さんとお会いできることを、スタッフ一同、心より楽しみにしております。
                  </p>
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: baseColor,
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
                  }}
                >
                  <hr
                    style={{
                      margin: '28px 0',
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
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
                  color: baseColor,
                  textAlign: 'left',
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
                    paddingTop: '!4px',
                    textAlign: 'left',
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '21.875px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      marginBottom: '14px',
                    }}
                  >
                    予約詳細
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
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {apply.name}
                  </p>
                  {apply.url && (
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
                          fontSize: '14px',
                          fontFamily: fontFamily,
                          color: baseColor,
                          display: 'block',
                          marginBottom: '14px',
                        }}
                      >
                        <a href={apply.url}>{apply.url}</a>
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
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {apply.email}
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
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {apply.content ? apply.content : '特になし'}
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
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    {apply.etc ? apply.etc : '特になし'}
                  </p>
                </td>
              </tr>
              <tr
                style={{
                  fontSize: '14px',
                  fontFamily: fontFamily,
                  color: baseColor,
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
                  }}
                >
                  <hr
                    style={{
                      margin: '28px 0',
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
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
                  color: baseColor,
                }}
              >
                <td
                  style={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: baseColor,
                    paddingTop: '14px',
                    paddingBottom: '28px',
                    textAlign: 'left',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                      textAlign: 'center',
                    }}
                  >
                    <a
                      href="https://fukuoka-creators.studio.site/"
                      style={{
                        maxWidth: '300px',
                        width: '85%',
                        margin: '0 1em',
                        padding: '0.5em',
                        fontSize: '1.2em',
                        fontFamily: fontFamily,
                        color: '#FFFFFF',
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
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                      textAlign: 'center',
                    }}
                  >
                    <a
                      href="https://libecity.com/room_list?room_id=DlVCa6dA8OyfHR9lDknV"
                      style={{
                        maxWidth: '300px',
                        width: '85%',
                        margin: '0 1em',
                        padding: '1em',
                        fontSize: '1.2em',
                        fontFamily: fontFamily,
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        borderRadius: '2px',
                        display: 'inline-block',
                        backgroundColor: '#384860',
                      }}
                    >
                      ユーザーコミュニティはこちら
                    </a>
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '14px',
                      fontFamily: fontFamily,
                      color: baseColor,
                      display: 'block',
                      marginBottom: '14px',
                      textAlign: 'center',
                    }}
                  >
                    <a
                      href={`${process.env.NEXT_PUBLIC_DOMAIN}apply/complete/${apply.uuid}`}
                      style={{
                        maxWidth: '300px',
                        width: '85%',
                        margin: '0 auto',
                        padding: '1em',
                        fontSize: '1.2em',
                        fontFamily: fontFamily,
                        color: '#e3007f',
                        border: 'solid 1px #e3007f',
                        textDecoration: 'none',
                        borderRadius: '2px',
                        display: 'inline-block',
                        backgroundColor: '#FFFFFF',
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
              color: '#595959',
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
                  color: '#595959',
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
