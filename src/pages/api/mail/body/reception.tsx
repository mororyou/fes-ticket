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

  const wrap = {
    maxWidth: '640px',
    minWidth: '480px',
    backgroundColor: '#ea339a7d',
    padding: '28px',
    margin: '0 auto',
  }

  const wrapInner = {
    backgroundColor: '#fff',
  }

  const row = {
    padding: '10px',
    display: 'table-cell',
  }

  const thanks = {
    fontSize: '16px',
    fontWeight: 700,
    margin: '18px auto',
    color: '#656363',
  }

  const itemLabel = {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '2px',
    lineHeight: '20px',
    color: '#656363',
  }

  const itemDescription = {
    fontSize: '14px',
    fontWeight: 400,
    marginBottom: '12px',
    lineHeight: '16px',
    paddingLeft: '4px',
    color: '#3f3f3f',
  }

  const item = {
    marginRight: '8px',
  }

  const linkBtn = {
    fontSize: '14px',
    fontWeight: 700,
    padding: '16px 64px',
    backgroundColor: '#ea339a',
    color: '#fff',
    borderRadius: '4px',
    margin: '24px 0',
    lineHeight: '80px',
    textDecolation: 'none',
  }

  const cancelBtn = {
    fontSize: '14px',
    fontWeight: 700,
    padding: '16px 64px',
    backgroundColor: '#D21577',
    color: '#fff',
    borderRadius: '4px',
    margin: '0 0 24px',
    lineHeight: '80px',
    textDecolation: 'none',
  }

  const bold = {
    fontWeight: 700,
  }

  return (
    <>
      <table style={wrap}>
        <tbody style={wrapInner}>
          <tr style={row}>
            <td>
              <p style={itemDescription}>
                この度は、【ITお悩み相談】へお申し込みいただき誠にありがとうございます。
                <br />
                以下の内容でご予約を承りましたのでご確認ください。
                <br />
                ※本メールは自動送信される確認メールです。ご返信は不要です。
                <br />
                予約が確定次第、【予約確定メール】をお送りいたしますので、しばらくお待ちいただきますようお願い申し上げます。
              </p>
              <p>
                *****************************************************************
                <br />
              </p>
              <p style={itemLabel}>お名前（リベシティ名）</p>
              <p style={itemDescription}>{body.name}</p>
              <p style={itemLabel}>リベシティプロフィールURL</p>
              <p style={itemDescription}>{body.url}</p>
              <p style={itemLabel}>メールアドレス</p>
              <p style={itemDescription}>{body.email}</p>
              <p style={itemLabel}>希望日時（複数選択可能）</p>
              <p style={itemDescription}>
                {dateObj.map((date: any, index: number) => (
                  <span style={item} key={index}>
                    ・{date.label}
                  </span>
                ))}
              </p>
              <p style={itemLabel}>相談カテゴリ（複数選択可能）</p>
              <p style={itemDescription}>
                {categoryObj.map((category: any, index: number) => (
                  <span style={item} key={index}>
                    ・{category.label}
                  </span>
                ))}
              </p>
              <p style={itemLabel}>相談内容（具体的にお願いします）</p>
              <p style={itemDescription}>
                {body.content ? body.content : '特になし'}
              </p>
              <p style={itemLabel}>その他</p>
              <p style={itemDescription}>{body.etc ? body.etc : '特になし'}</p>
              <br />
              <p>
                *****************************************************************
                <br />
              </p>
              <p style={itemLabel}>
                ■ITお悩み相談by福岡クリエイターズのWebサイトはこちら！
              </p>
              　
              <a
                href={`https://fukuoka-creators.studio.site/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://fukuoka-creators.studio.site/
              </a>
              <p style={itemLabel}>＜予約内容の変更をしたい場合＞</p>
              <p>
                以下の「お申し込みをキャンセルする」ボタンよりキャンセルの上、再度お手続きをお願いいたします。
              </p>
              <br />
              <br />
              <br />
              <br />
              <a
                href={`${process.env.NEXT_PUBLIC_DOMAIN}apply/complete/${body.uuid}`}
                target="_blank"
                rel="noopener noreferrer"
                style={cancelBtn}
              >
                キャンセルの申し込みはこちら
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
