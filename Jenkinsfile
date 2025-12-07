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
                    // Simulate failure randomly for learning purposes
                    def testStatus = sh(script: 'if [ $((RANDOM % 2)) -eq 0 ]; then exit 0; else exit 1; fi', returnStatus: true)
                    if (testStatus != 0) {
                        error("Tests failed!")  // triggers failure handling
                    } else {
                        echo "All tests passed!"
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
                withCredentials([string(credentialsId: 'MY_API_KEY', variable: 'KEY')]) {
                    echo "Deploying to staging at ${env.STAGING_URL} using secret key."
                    sh 'echo "Deployment to staging completed."'
                }
            }
        }

        stage('Approval') {
            steps {
                input message: "Approve deployment to Production?", ok: "Deploy"
            }
        }

        stage('Deploy to Production') {
            steps {
                withCredentials([string(credentialsId: 'MY_API_KEY', variable: 'KEY')]) {
                    echo "Deploying to production at ${env.PRODUCTION_URL} using secret key."
                    sh 'echo "Deployment to production completed successfully."'
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline encountered an error!'
            echo 'Simulating rollback...'
            sh 'echo "Rollback to last stable version completed."'
            echo 'Sending failure notification to team (simulated)...'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        unstable {
            echo 'Pipeline completed with warnings.'
        }
    }
}
