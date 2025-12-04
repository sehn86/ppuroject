# 스프린트 태스크 보드

## 진행 규칙
- **완료 기준(Definition of Done):** 문서/코드/스크립트가 실제로 동작하고, 관련 테스트·린트가 통과하며, 검토 의견이 반영된 상태로 머지 가능해야 한다. 사용자-facing 문서(README, .env 예시, 실행 가이드)와 이 보드의 상태가 최신이어야 한다.
- **이월 규칙:** 스프린트 종료 시 미완료 태스크는 체크박스를 유지한 채 다음 스프린트로 이동하고, 남은 범위와 새로운 ETA를 메모한다.
- **상태 갱신:** 커밋·PR 시점에 관련 태스크의 체크박스, ETA, 비고를 최신 상태로 업데이트한다.

## Infrastructure
- [ ] 로컬 단일 머신(집 PC) 기준 dev/prod 겸용 docker-compose 설계 및 실행 검증
- [ ] 로컬 개발 온보딩 가이드(포트, 환경변수, 초기 데이터) 작성

| 태스크 | 우선순위 | ETA | 비고 |
| --- | --- | --- | --- |
| `docker-compose`로 Postgres + API + Web 서비스 정의하고 `.env.example`/`docker-compose.override.yml`로 포트·볼륨 분리. | P0 | 2024-07-08 | 집 PC 고정 IP/포트 고려, AWS 미사용 명시 |
| `pnpm install` ~ `pnpm dev` 전체 흐름을 README에 추가하고, 첫 실행 체크리스트(노드 버전, 환경변수) 작성. | P0 | 2024-07-09 | npm/pnpm 혼용 방지 주석 포함 |
| 컨테이너 없이도 실행 가능한 로컬 모드 명령어(api/web)와 로그 확인 방법 정리. | P1 | 2024-07-10 | 오프라인 환경 가정 |

## Backend
- [ ] NestJS 모듈/컨트롤러/서비스 설계서와 라우팅 테이블 명세
- [ ] Prisma 스키마 및 마이그레이션 생성, 시드 데이터 스크립트 준비

| 태스크 | 우선순위 | ETA | 비고 |
| --- | --- | --- | --- |
| Workspace > Page > Project > Task 스키마 모델링(타임스탬프, optional due, status) 및 `prisma migrate dev` 실행. | P0 | 2024-07-07 | SQLite→Postgres 전환 메모 포함 |
| `ProjectController`/`TaskController` CRUD + 필터(Today/Overdue/Upcoming, My Tasks) 구현, DTO/유효성 검사 공유 타입 준수. | P0 | 2024-07-09 | 페이지네이션 기본값/최대값 명시 |
| 시드 스크립트로 워크스페이스/폴더/페이지/프로젝트/태스크 더미 생성, `pnpm prisma db seed` 연동. | P1 | 2024-07-10 | 프론트 데모용 더미 계정 포함 |

## Frontend
- [ ] Next.js 레이아웃(헤더+사이드바) 및 페이지 라우팅 `/home`, `/project/:id`, `/tasks`
- [ ] Task 필터 탭, 프로젝트 상세 블록 영역, 로딩/에러 UX 처리

| 태스크 | 우선순위 | ETA | 비고 |
| --- | --- | --- | --- |
| 공용 레이아웃: 로고/검색/“My Tasks” 버튼, 워크스페이스 트리(접기/펼치기) 사이드바 구현. | P0 | 2024-07-08 | API 연동 전 목업 데이터 포함 |
| `/project/:id` 페이지에 블록 자리표시자 + 관련 태스크 리스트(완료 토글, 설명/기한 편집) UI 구현. | P0 | 2024-07-10 | optimistic update 여부 결정 주석 |
| `/tasks` “My Tasks” 탭형 목록(Today/Overdue/Upcoming) + 페이지네이션/상태 배지/프로젝트 링크 구성. | P1 | 2024-07-11 | 빈 상태/로딩/에러 메시지 포함 |

## Database
- [ ] 로컬 Postgres 볼륨/백업 전략 수립 및 실행 가이드
- [ ] 마이그레이션/롤백 절차 문서화(dev/prod 겸용)

| 태스크 | 우선순위 | ETA | 비고 |
| --- | --- | --- | --- |
| Docker 기반 Postgres 서비스 정의(퍼시스턴트 볼륨, 로컬 전용 계정/DB) 및 헬스체크 스크립트. | P0 | 2024-07-06 | 포트 충돌 시 대체 포트 표기 |
| `prisma migrate dev/deploy` 사용법, 롤백·백업(pg_dump/restore) 흐름을 README 섹션에 추가. | P1 | 2024-07-09 | 집 PC 스케줄 백업 예시 포함 |
