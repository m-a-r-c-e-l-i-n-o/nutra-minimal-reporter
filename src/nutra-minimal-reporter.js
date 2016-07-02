import Color from 'colors/safe'

const reporter = (events, system, opts) => {
    events.onLoad = () => {}
    events.onFrameworkExecution = framework => {
        try {
            const minimalReporter =  {
                specDone: function(result) {
                    if (result.failedExpectations.length > 0) {
                        console.log(Color.red('Spec: "' + result.description + '", ' + result.status))
                    }
                    for (var i = 0; i < result.failedExpectations.length; i++) {
                        console.log(Color.red(result.failedExpectations[i].message))
                        system.handleError(new Error(''))
                    }
                },
                suiteDone: function(result) {
                    if (result.failedExpectations.length > 0) {
                        console.log(Color.red('Suite: "' + result.description + '"'))
                    }
                    for (var i = 0; i < result.failedExpectations.length; i++) {
                        console.log(Color.red(result.failedExpectations[i].message))
                        system.handleError(new Error(''))
                    }
                },
                jasmineDone: function() {
                    console.log(Color.green('All tests passed.'))
                }
            }
            framework.addReporter(minimalReporter)
        } catch (e) {
            console.log(e)
        }
    }
    events.onExit = () => {}
}

export { reporter }


