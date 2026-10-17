import { Table } from "@radix-ui/themes";

export default function Awards() {
  return (
    <div className="section-group">
      <div className="flex flex-row items-center gap-2">
        <h2 className="section-title">Awards</h2>
      </div>
      <div
        className="w-full overflow-x-auto"
        role="region"
        aria-label="수상 내역 — 작은 화면에서 좌우로 스크롤"
        tabIndex={0}
      >
        <Table.Root
          className="section-meta w-full min-w-[36rem] rounded-2xl break-keep"
          variant="surface"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>수상명</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>수여 기관</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>수상 일자</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>
                삼성소프트웨어AI아카데미 프로젝트 전시발표회 전시부문 입상
              </Table.RowHeaderCell>
              <Table.Cell>삼성전자 주식회사</Table.Cell>
              <Table.Cell>2025.06</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>
                삼성소프트웨어AI아카데미 자율프로젝트 우수상
              </Table.RowHeaderCell>
              <Table.Cell>삼성전자 주식회사</Table.Cell>
              <Table.Cell>2025.05</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>
                삼성소프트웨어AI아카데미 특화프로젝트 우수상
              </Table.RowHeaderCell>
              <Table.Cell>삼성전자 주식회사</Table.Cell>
              <Table.Cell>2025.04</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>
                삼성소프트웨어AI아카데미 관통프로젝트 최우수상
              </Table.RowHeaderCell>
              <Table.Cell>삼성전자 주식회사</Table.Cell>
              <Table.Cell>2024.12</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
