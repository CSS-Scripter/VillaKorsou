window.onload = main

function main() {
    var calendarEl = document.getElementById('calendar')
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    })
    calendar.render()

    scrollingStuff()
}

function onSubmit(token) {
    console.log('Success!')
}

function scrollingStuff() {
    const sectionIds = [
        'banner',
        'villa',
        'gallery',
        'video',
        'reviews',
        'availability',
        'contact'
    ]

    const highlightMostVisibleSectionInMenu = () => {
        let largestElement = {id: '', percentage: 0}
        for (let id of sectionIds) {
            const element = document.getElementById(id)
            if (element != undefined) {
                const percentageVisible = percentageSeen(element)
                if (percentageVisible > largestElement['percentage']) {
                    largestElement = {
                        id: element.id,
                        percentage: percentageVisible
                    }
                }
                if (largestElement['percentage' != 0] && percentageVisible == 0) {
                    break
                }
            }
        }

        for (let navButton of document.getElementsByTagName('nav')[0].children) {
            if (navButton.id != `${largestElement.id}-button`) {
                navButton.classList = []
            } else {
                navButton.classList = ['current']
            }
        }
    }

    const percentageSeen = (element) => {
        const viewportHeight = window.innerHeight
        const scrollTop = window.scrollY
        const elementOffsetTop = element.offsetTop
        const elementHeight = element.offsetHeight

        const topToElement = elementOffsetTop - scrollTop
        const percentageTopToElement = keepValueBetween(0, 100, Math.round(topToElement / viewportHeight * 100))

        const bottomOfScreen = scrollTop + viewportHeight
        const bottomOfElement = elementOffsetTop + elementHeight
        const elementToBottom = bottomOfScreen - bottomOfElement
        const percentageBottomToElement = keepValueBetween(0, 100, Math.round(elementToBottom / viewportHeight * 100))

        const percentageOfElementVisible = 100 - (percentageTopToElement + percentageBottomToElement)
        return percentageOfElementVisible

        function keepValueBetween(min, max, number) {
            return Math.min(max, Math.max(min, number))
        }
    }

    window.addEventListener("scroll", highlightMostVisibleSectionInMenu);
    highlightMostVisibleSectionInMenu();
}

function scrollToElement(id) {
    var element = document.getElementById(id)
    element.scrollIntoView({behavior: "smooth", top: -150})
}
