# 2026-01-web-study

KOSS에서 진행하는 2026학년도 1학기 웹 프로젝트 스터디 레포입니다.

## 스터디 목표
- HTML, CSS, JavaScript 기초를 직접 수정하면서 익힙니다. https://www.youtube.com/watch?v=ffENjt7aEdc
- AI 도구를 활용해 웹 페이지를 스스로 개선하는 경험을 쌓습니다.
- 주차별 과제를 통해 개인 결과물을 누적하고, 마지막에는 각자 프로젝트로 확장합니다.

## 폴더 구조
- `week1/`: 1주차 실습 자료
- `week2/`: 2주차 실습 자료
- `projects/`: 학생 제출 구조 안내용 폴더
- `materials/`: 공지, 참고 자료, 발표 자료

## 일정
| 주차 | 진도 |
| --- | --- |
| 1주차 | 개발 환경 세팅 |
| 2주차 | HTML / CSS / JavaScript 기초 |
| 3주차 | 바이브코딩으로 웹 만들어보기 |
| 4주차 | AI가 만든 코드 뜯어보기 (구조 이해) |
| 5주차 | 백엔드 + 데이터베이스 + 프론트 연결 |
| 6주차 | 배포 및 실사용 테스트 |

세부 일정은 스터디 진행 상황에 맞춰 업데이트합니다.

## 규칙
- 모든 실습과 과제는 이 레포 안에서 관리합니다.
- 학생별 작업물은 반드시 본인 fork 레포의 `projects/<github-id>/` 아래에 정리합니다.
- 작업은 공용 레포가 아니라, 본인이 fork한 레포의 `main` 브랜치에서 진행합니다.
- 공용 레포 `main` 브랜치에는 공용 자료만 두고, 학생 제출물은 두지 않습니다.
- 파일명과 폴더명은 임의로 바꾸지 않고, 안내된 구조를 유지합니다.
- 커밋 메시지는 작업 내용을 알 수 있게 간단히 작성합니다.
- 다른 사람 폴더는 수정하지 않습니다.

## 과제 제출 방법
1. GitHub에서 이 공용 레포를 본인 계정으로 `fork` 합니다.
2. 본인 fork 레포를 `clone` 합니다.
3. 본인 fork 레포의 `main` 브랜치에서 본인 폴더를 `projects/<github-id>/` 형태로 만들거나 기존 폴더를 사용합니다.
4. 주차별 과제는 `projects/<github-id>/week1`, `projects/<github-id>/week2`처럼 정리합니다.
5. 작업 후 변경 사항을 커밋하고, 본인 fork 레포의 `main`으로 `push`합니다.
6. GitHub에서 본인 fork 레포 `main`에서 공용 레포 `main`으로 `Pull Request`를 열어 제출합니다.
7. 운영자는 PR을 확인한 뒤 리뷰하고, 제출 확인용으로 `close`합니다. 학생 제출 PR은 기본적으로 `merge`하지 않습니다.

권장 fork 구조:

```text
내 GitHub 계정/fork 레포
  main
```

예시:

```text
pahaha404 fork repo
  main

projects/
  pahaha404/
    week1/
    week2/
    final/
```

예시 명령:

```bash
git clone https://github.com/pahaha404/2026-01-web-study.git
cd 2026-01-web-study
git add projects/pahaha404/week1
git commit -m "Add week1 assignment"
git push origin main
```

그 다음 GitHub에서 `pahaha404:main -> kmu-koss:main` Pull Request를 생성합니다.
이 PR은 제출 확인용이며, `main`에는 merge하지 않습니다.

## 시작 가이드
- 1주차 실습은 `week1/index.html`을 브라우저로 열거나 VS Code `Live Server`로 실행하면 됩니다.
- 참고 자료와 공지는 `materials/`에 추가합니다.

## 운영 문서
- `materials/student-announcement.md`: 학생 공지문
- `materials/submission-guide.md`: 과제 제출 가이드
- `materials/orientation-script.md`: 첫 안내용 진행 스크립트
- `.github/pull_request_template.md`: 제출용 Pull Request 템플릿

## 운영 메모
- 학생 초대: GitHub Organization 또는 레포 `Settings`의 멤버 관리 기능을 사용합니다.
- 피드백: 학생 브랜치와 Pull Request 기준으로 코드 확인 및 리뷰를 진행합니다.
- 제출 확인 후 PR은 merge하지 않고 닫습니다.
