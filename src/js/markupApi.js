export default function makeMarkup(array) {
    const markupStrings = array.map(el => {
      return `<a href="${el.largeImageURL}"
            ><div
              class="photo-card"
              style="
                background-image: url('${el.webformatURL
          }');
                background-size: cover;
              "></div>
            </div></a
          >`
    })

    return markupStrings.join('')

}