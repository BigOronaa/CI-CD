pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }
        stage('Package') {
            steps {
                echo 'Packaging the application...'
            }
        }
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
            }
        }
        stage('Approval') {
            steps {
                input 'Approve deployment to production?'
            }
        }
        stage('Deploy to Production') {
            steps {
                echo 'Deploying to production environment...'
            }
        }
    }
}
