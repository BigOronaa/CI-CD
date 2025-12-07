pipeline {
    agent any

    environment {
        STAGING_URL = "staging.example.com"
        PRODUCTION_URL = "prod.example.com"
        KEY = credentials('MY_API_KEY') // your secret key
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            parallel {
                stage('Build') {
                    steps {
                        echo 'Installing dependencies...'
                        sh 'echo "Dependencies installed successfully."'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        echo 'Running unit tests...'
                        sh 'echo "Unit tests passed!"'
                    }
                }
                stage('Lint') {
                    steps {
                        echo 'Running code linting...'
                        sh 'echo "Lint passed!"'
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
            echo 'Pipeline failed! Initiating automated rollback...'
            script {
                // Rollback to previous commit
                def previousCommit = sh(script: 'git rev-parse HEAD~1', returnStdout: true).trim()
                echo "Rolling back to previous commit: ${previousCommit}"
                sh "git checkout ${previousCommit}"
                echo 'Rebuilding previous stable version...'
                sh 'echo "Dependencies installed successfully."'
                sh 'echo "Application packaged successfully."'
                echo 'Redeploying to staging...'
                sh 'echo "Deployment to staging completed."'
                echo 'Redeploying to production...'
                sh 'echo "Deployment to production completed successfully."'
                echo 'Rollback and redeployment completed.'
            }
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
