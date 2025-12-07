pipeline {
    agent any

    environment {
        API_KEY = credentials('MY_API_KEY')
    }

    stages {

        stage('Build') {
            steps {
                echo "Building application..."
                sh 'echo Build complete'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                sh 'echo Tests executed'
            }
        }

        stage('Package') {
            steps {
                echo "Packaging application..."
                sh 'zip -r app.zip *'
                archiveArtifacts artifacts: 'app.zip', fingerprint: true
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Deploying to staging environment..."
                sh 'echo Staging deployment complete'
            }
        }

        stage('Approval') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    input message: "Approve deployment to Production?"
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                echo "Deploying to PRODUCTION..."
                sh 'echo Production deployment complete'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed — starting rollback..."
            sh 'echo Rolling back to previous stable version'
        }
    }
}
