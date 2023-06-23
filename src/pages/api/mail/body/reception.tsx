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
    backgroundColor: 'tomato',
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
              <p>
                ********************************************************************
                <br />
                <span style={thanks}>お申し込みありがとうございます。</span>
                <br />
                <span style={bold}>下記の内容にて受付が完了しました。</span>
                <br />
                ※本メールは予約された方への自動返信メールです。
                <br />
                数日以内に追ってご連絡いたしますので少々お待ちください。
                <br />
                ********************************************************************
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

              {body.url && (
                <a
                  href="https://libecity.com/room_list?room_id=DlVCa6dA8OyfHR9lDknV"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkBtn}
                >
                  ブースのチャットはこちら
                </a>
              )}
              <br />
              <a
                href={`${process.env.NEXT_PUBLIC_DOMAIN}apply/complete/${body.uuid}`}
                target="_blank"
                rel="noopener noreferrer"
                style={cancelBtn}
              >
                キャンセルの申し込みはこちら
              </a>

              <p>
                ********************************************************************
              </p>
              <p style={itemLabel}>【注意事項】</p>
              <p style={itemDescription}>
                ・数日以内に「予約確定メール」をお送りします。
                <br />
                　そちらのメールをもって予約確定となりますので必ずご確認をお願いします。
                <br />
                ・すでに予約枠が埋まっている場合は、改めてご連絡いたします。
                <br />
              </p>
              <p>
                ********************************************************************
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
