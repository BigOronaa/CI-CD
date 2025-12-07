pipeline {
    agent any

    environment {
        STAGING_URL = "staging.example.com"
        PRODUCTION_URL = "prod.example.com"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'echo "Dependencies installed successfully."'
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    
                    // Simulate test failure
                    def testPassed = false

                    if (!testPassed) {
                        echo 'Tests failed! Triggering rollback...'
                        // Fail the build so post { failure { … } } runs
                        error("Tests did not pass")
                    } else {
                        echo 'All tests passed!'
                    }
                }
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging application...'
                sh 'echo "Application packaged successfully."'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Deploying to staging at ${env.STAGING_URL}..."
                sh 'echo "Deployment to staging completed."'
            }
        }

        stage('Approval') {
            steps {
                input message: "Approve deployment to Production?", ok: "Deploy"
            }
        }

        stage('Deploy to Production') {
            steps {
                echo "Deploying to production at ${env.PRODUCTION_URL}..."
                sh 'echo "Deployment to production completed successfully."'
            }
        }
    }

    post {
        failure {
            echo 'Build failed! Executing rollback...'
            sh 'echo "Rollback completed successfully."'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
