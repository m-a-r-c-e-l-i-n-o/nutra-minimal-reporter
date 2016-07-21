import Color from 'colors/safe'

const reporter = (events, system, opts) => {
    events.onLoad = () => {}
    events.onFrameworkExecution = framework => {
        let errors = 0
        const minimalReporter =  {
            specDone: function(result) {
                if (result.failedExpectations.length > 0) {
                    console.log(Color.red('Spec: "' + result.description + '", ' + result.status))
                }
                for (var i = 0; i < result.failedExpectations.length; i++) {
                    console.log(Color.red(result.failedExpectations[i].stack))
                    errors++
                }
            },
            suiteDone: function(result) {
                if (result.failedExpectations.length > 0) {
                    console.log(Color.red('Suite: "' + result.description + '"'))
                }
                for (var i = 0; i < result.failedExpectations.length; i++) {
                    console.log(Color.red(result.failedExpectations[i].stack))
                    errors++
                }
            },
            jasmineDone: function() {
                const message = 'Tests have'
                const outcome = ( errors ? 'failed.' : 'passed!' )
                const colored = ( errors ?
                    Color.red(message) + ' ' + Color.red(outcome) :
                    Color.green(message) + ' ' + Color.green(outcome)
                )
                console.log(colored)
            }
        }
        framework.addReporter(minimalReporter)
    }
    events.onExit = () => {}
}

export { reporter }


