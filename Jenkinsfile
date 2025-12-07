pipeline {
    agent any

    environment {
        STAGING_URL = "staging.example.com"
        PRODUCTION_URL = "prod.example.com"
        KEY = credentials('MY_API_KEY')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    checkout scm
                    def duration = (System.currentTimeMillis() - startTime)/1000
                    echo "Stage Checkout SCM duration: ${duration} sec"
                    currentBuild.description = "Checkout: ${duration} sec"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    echo 'Installing dependencies...'
                    sh 'echo "Dependencies installed successfully."'
                    def duration = (System.currentTimeMillis() - startTime)/1000
                    echo "Stage Build duration: ${duration} sec"
                    currentBuild.description += " | Build: ${duration} sec"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    echo 'Running tests...'
                    sh 'echo "All tests passed!"'
                    def duration = (System.currentTimeMillis() - startTime)/1000
                    echo "Stage Test duration: ${duration} sec"
                    currentBuild.description += " | Test: ${duration} sec"
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    echo 'Packaging application...'
                    sh 'echo "Application packaged successfully."'
                    def duration = (System.currentTimeMillis() - startTime)/1000
                    echo "Stage Package duration: ${duration} sec"
                    currentBuild.description += " | Package: ${duration} sec"
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    withCredentials([string(credentialsId: 'MY_API_KEY', variable: 'KEY')]) {
                        echo "Deploying to staging at ${env.STAGING_URL} using secret key."
                        sh 'echo "Deployment to staging completed."'
                    }
                    def duration = (System.currentTimeMillis() - startTime)/1000
                    echo "Stage Deploy to Staging duration: ${duration} sec"
                    currentBuild.description += " | Staging: ${duration} sec"
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
                script {
                    def startTime = System.currentTimeMillis()
                    withCredentials([string(credentialsId: 'MY_API_KEY', variable: 'KEY')]) {
                        echo "Deploying to production at ${env.PRODUCTION_URL} using secret key."
                        sh 'echo "Deployment to production completed successfully."'
                    }
                    def duration = (System.currentTimeMillis() - startTime)/1000
                    echo "Stage Deploy to Production duration: ${duration} sec"
                    currentBuild.description += " | Production: ${duration} sec"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed. Dashboard logs updated."
            // Here we simulate metrics you would later see in a real dashboard
        }
        failure {
            echo 'Pipeline failed! Triggering rollback...'
            sh 'echo "Rollback to last stable version completed."'
            echo 'Sending failure notification to team (simulated)...'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
