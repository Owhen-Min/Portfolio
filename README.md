# 민경현의 포트폴리오 입니다.

관심이 있으신 분은 skyblue848@naver.com으로 메일 보내주시면 감사하겠습니다.

## 배포

`master` 브랜치에 push하면 GitHub Actions가 의존성을 설치하고 `npm run build`로
생성한 `dist`를 GitHub Pages에 배포합니다. 빌드 결과물은 Git에 커밋하지 않습니다.
로컬 커밋 후에는 `git push origin master`까지 실행해야 사이트에 반영됩니다.

- 사이트: https://owhen-min.github.io/Portfolio/
- 배포 상태: https://github.com/Owhen-Min/Portfolio/actions/workflows/deploy-pages.yml
- 저장소의 Settings → Pages → Source는 **GitHub Actions**로 설정합니다.
- 필요하면 Actions에서 **Run workflow**로 수동 배포할 수 있습니다.

`npm run deploy`는 기존 `gh-pages` 브랜치에 파일을 올리는 수동 명령입니다.
현재 Pages는 GitHub Actions에서 생성한 배포 결과를 사용합니다.
